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
)

//"strconv"
//"strings"

//Insere Ingredient no db
func CreateIngredient(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Criando ingredient_id!"))
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

	query := "INSERT INTO ingredients (nome, description) VALUES ('"+ingredient.Nome+"','"+ingredient.Description+"')"

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }
	for sqlStatement.Next() {
		w.WriteHeader(200)
		fmt.Println("Criando o ingredients")
    }

}

//Busca todos os Ingredients salvos no db
func GetAllIngredients(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "Select * from ingredients"

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	for sqlStatement.Next() {

        var ingredient models.Ingredient

        err = sqlStatement.Scan(&ingredient.ID, &ingredient.Nome, &ingredient.Description, &ingredient.DataCriacao)
        if err != nil {
			panic(err.Error())
		}
		w.WriteHeader(200)
		
		json.NewEncoder(w).Encode(ingredient)
    }
	fmt.Println("Listando todos os ingredients")
}

//Busca um Ingredient salvo no db
func GetIngredientById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	params := mux.Vars(r)

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "Select id_ingredients, nome, description from ingredients where id_ingredients = " + params["ingredients_id"]

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	for sqlStatement.Next() {

        var ingredient models.Ingredient

        err = sqlStatement.Scan(&ingredient.ID, &ingredient.Nome, &ingredient.Description)
        if err != nil {
			panic(err.Error())
		}
		w.WriteHeader(200)
		
		json.NewEncoder(w).Encode(ingredient)
		fmt.Println("ingredient_id:", params["ingredients_id"]," foi encontrado")
		return
    }

	w.WriteHeader(404)
	fmt.Println("ingredient_id:", params["ingredients_id"]," NÃO foi encontrado")
}

//Atualiza informações de um Ingredient e salva no db
func UpdateIngredientById(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Criando ingredient_id!"))
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
}
