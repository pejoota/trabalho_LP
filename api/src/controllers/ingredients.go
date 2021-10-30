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
	"strconv"
)

//Insere Ingredient no db
func CreateIngredient(w http.ResponseWriter, r *http.Request) {
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

	if  len(ingredient.Nome)==0 || len(ingredient.Description)==0 {
		w.WriteHeader(400)
		w.Write([]byte("Erro ao criar Ingredient, campo(s) nulos"))
		fmt.Println("Erro ao criar Ingredient, campo(s) nulos")
		return
    }

	query := "INSERT INTO ingredients (nome, description) VALUES ('"+ingredient.Nome+"','"+ingredient.Description+"') RETURNING id_ingredients"

	sqlStatement, err := db.Query(query)
	if err != nil {
		w.WriteHeader(400)
		w.Write([]byte("Erro ao criar Ingredient"))
        panic(err.Error())
    }

	for sqlStatement.Next() {
		var id string
        err = sqlStatement.Scan(&id)
        if err != nil {
			panic(err.Error())
		}
		aux_ID,err_ID := strconv.Atoi(id)
		if err_ID != nil {
			panic(err.Error())
		}
		ingredient.ID = uint64(aux_ID)
		json.NewEncoder(w).Encode(ingredient)
		fmt.Println("Ingredient Criado com id: ",id)
		return
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

	//query := "SELECT * from ingredients"
	query := "select array_to_json(array_agg(row_to_json(ingredients_alias))) from (select id_ingredients as \"id\",nome as \"nome\", description as \"description\", datacriacao as \"dataCriacao\" from ingredients) ingredients_alias"
	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	//Funcional
	var aux string
	for sqlStatement.Next() {
        err = sqlStatement.Scan(&aux)
        if err != nil {
			panic(err.Error())
		}
    }
	w.Write([]byte(aux))

	//Também Funcional, porém podendo mudar o padrão time aplicado
	//aux := "["
	//for sqlStatement.Next() {
	//	var ingredient models.Ingredient
    //    err = sqlStatement.Scan(&ingredient.ID, &ingredient.Nome, &ingredient.Description, &ingredient.DataCriacao)
    //    if err != nil {
	//		panic(err.Error())
	//	}
	//	str := fmt.Sprintf("{\"Id\":\"%d\",\"Nome\":\"%s\",\"Description\":\"%s\", \"DataCriacao\":\"%s\"},", ingredient.ID, ingredient.Nome, ingredient.Description, ingredient.DataCriacao.Format(time.RFC822))
	//	aux = aux + str
    //}
	//aux = trimLastChar(aux)
	//aux = aux + "]"
	//w.Write([]byte(aux))

	fmt.Println("Listando todos os ingredients")

	defer db.Close()
}

func GetAllIngredientsIds(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	//query := "SELECT * from ingredients"
	query := "select array_to_json(array_agg(row_to_json(ingredients_alias))) from (select id_ingredients as \"id\" from ingredients) ingredients_alias"
	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	//Funcional
	var aux string
	for sqlStatement.Next() {
        err = sqlStatement.Scan(&aux)
        if err != nil {
			panic(err.Error())
		}
    }
	w.Write([]byte(aux))

	//Também Funcional, porém podendo mudar o padrão time aplicado
	//aux := "["
	//for sqlStatement.Next() {
	//	var ingredient models.Ingredient
    //    err = sqlStatement.Scan(&ingredient.ID, &ingredient.Nome, &ingredient.Description, &ingredient.DataCriacao)
    //    if err != nil {
	//		panic(err.Error())
	//	}
	//	str := fmt.Sprintf("{\"Id\":\"%d\",\"Nome\":\"%s\",\"Description\":\"%s\", \"DataCriacao\":\"%s\"},", ingredient.ID, ingredient.Nome, ingredient.Description, ingredient.DataCriacao.Format(time.RFC822))
	//	aux = aux + str
    //}
	//aux = trimLastChar(aux)
	//aux = aux + "]"
	//w.Write([]byte(aux))

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
	
	for sqlStatement.Next() {

        var ingredient models.Ingredient

        err = sqlStatement.Scan(&ingredient.ID, &ingredient.Nome, &ingredient.Description, &ingredient.DataCriacao)
        if err != nil {
			panic(err.Error())
		}
		
		//if (models.Ingredient{}) == ingredient {
		//	w.WriteHeader(404)
		//	w.Write([]byte("Ingredient não encontrado"))
		//	fmt.Println("ingredient_id:", params["ingredients_id"]," NÃO foi encontrado")
		//	return
		//}
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

	if  len(ingredient.Nome)==0 || len(ingredient.Description)==0 {
		w.WriteHeader(400)
		w.Write([]byte("Erro ao atualizar Ingredient, campo(s) nulos"))
		fmt.Println("Erro ao atualizar Ingredient, campo(s) nulos")
		return
    }

	if confere_id((params["ingredients_id"])) {
		fmt.Println("ingredient_id:", params["ingredients_id"]," não foi encontrado")
		w.WriteHeader(404)
		return
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

	if confere_id((params["ingredients_id"])) {
		fmt.Println("ingredient_id:", params["ingredients_id"]," não foi encontrado")
		w.WriteHeader(404)
		return
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

func confere_id(id string) bool{
	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "SELECT id_ingredients from ingredients"

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	for sqlStatement.Next() {	
		var tmp string
		err = sqlStatement.Scan(&tmp)
        if err != nil {
			panic(err.Error())
		}

		if tmp == id {
			return false
		}
    }
	defer db.Close()
	return true
}

func trimLastChar(s string) string {
    return s[:len(s)-1]
}