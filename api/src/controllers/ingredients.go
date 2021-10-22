package controllers

import (
	"fmt"
	"net/http"
	"io/ioutil"
	"log"
	"api/src/models"
	"api/src/config"
	"encoding/json"
	"github.com/gorilla/mux"
	"time"
)

//Insere Ingredient no db
func CreateIngredient(w http.ResponseWriter, r *http.Request) {
	//w.Write([]byte("Criando ingredient_id!"))
	corpoRequest, erro := ioutil.ReadAll(r.Body)
	if erro != nil {
		log.Fatal(erro)
	}

	var ingredient models.Ingredient

	if erro = json.Unmarshal(corpoRequest, &ingredient); erro != nil {
		log.Fatal(erro)
	}

	db, erro := config.Conectar()
	if erro != nil {
		log.Fatal(erro)
	}

	query := "INSERT INTO ingredients (nome, description) VALUES ('"+ingredient.Nome+"','"+ingredient.Description+"') RETURNING id_ingredients"

	sqlStatement, err := db.Query(query)
	if err != nil {
		w.WriteHeader(400)
        panic(err.Error())
    }

	for sqlStatement.Next() {
		var id string
        err = sqlStatement.Scan(&id)
        if err != nil {
			panic(err.Error())
		}
		w.Write([]byte(id))
		fmt.Println("Usuário Criado com id: ",id)
	}
	

	defer db.Close()
}

//Busca todos os Ingredients salvos no db
func GetAllIngredients(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "SELECT * from ingredients"

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	aux := "["
	for sqlStatement.Next() {
		var ingredient models.Ingredient
        err = sqlStatement.Scan(&ingredient.ID, &ingredient.Nome, &ingredient.Description, &ingredient.DataCriacao)
        if err != nil {
			panic(err.Error())
		}
		str := fmt.Sprintf("{\"Id\":\"%d\",\"Nome\":\"%s\",\"Description\":\"%s\", \"DataCriacao\":\"%s\"},", ingredient.ID, ingredient.Nome, ingredient.Description, ingredient.DataCriacao.Format(time.RFC822))
		aux = aux + str
    }
	aux = trimLastChar(aux)
	aux = aux + "]"
	w.Write([]byte(aux))

	fmt.Println("Listando todos os ingredients")

	defer db.Close()
}

//Busca um Ingredient salvo no db
func GetIngredientById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	params := mux.Vars(r)

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "Select id_ingredients, nome, description, datacriacao from ingredients where id_ingredients = " + params["ingredients_id"]

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }
	w.WriteHeader(200)
	for sqlStatement.Next() {

        var ingredient models.Ingredient

        err = sqlStatement.Scan(&ingredient.ID, &ingredient.Nome, &ingredient.Description, &ingredient.DataCriacao)
        if err != nil {
			panic(err.Error())
		}
		
		json.NewEncoder(w).Encode(ingredient)
		fmt.Println("ingredient_id:", params["ingredients_id"]," foi encontrado")
		return
    }

	w.WriteHeader(404)
	fmt.Println("ingredient_id:", params["ingredients_id"]," NÃO foi encontrado")

	defer db.Close()
}

//Atualiza informações de um Ingredient e salva no db
func UpdateIngredientById(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	corpoRequest, erro := ioutil.ReadAll(r.Body)
	if erro != nil {
		log.Fatal(erro)
	}

	var ingredient models.Ingredient

	if erro = json.Unmarshal(corpoRequest, &ingredient); erro != nil {
		log.Fatal(erro)
	}

	db, erro := config.Conectar()
	if erro != nil {
		log.Fatal(erro)
	}

	//query := "INSERT INTO ingredients (nome, description) VALUES ('"+ingredient.Nome+"','"+ingredient.Description+"')"
	query := "UPDATE ingredients set nome = '"+ingredient.Nome+"', description = '"+ingredient.Description+"' where id_ingredients = "+params["ingredients_id"]


	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }
	for sqlStatement.Next() {
		return
    }

	w.WriteHeader(200)

	fmt.Println("ingredient_id:", ingredient.ID," foi Atualizado")
	defer db.Close()
}

//Apaga Ingredient do db
func DeleteIngredientById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	params := mux.Vars(r)

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "Delete from ingredients where id_ingredients = " + params["ingredients_id"]

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	for sqlStatement.Next() {	
		return
    }
	w.WriteHeader(410)
	fmt.Println("ingredient_id:", params["ingredients_id"]," foi DELETADO")
	defer db.Close()
}

func trimLastChar(s string) string {
    return s[:len(s)-1]
}