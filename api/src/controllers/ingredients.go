package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
)

//Insere usuário no db
func CreateIngredient(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Criando ingredient_id!"))
}

//Busca todos os usuário salvos no db
func GetAllIngredients(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Buscando todos os ingredient_id!"))
}

//Busca um usuário salvo no db
func GetIngredientById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	partes := strings.Split(r.URL.Path,"/")

	if len(partes) > 3 {
		//w.WriteHeader(http.StatusNotFound)
		w.WriteHeader(400)
		return
	}

	id, err := strconv.Atoi(partes[2])
	if err != nil {
		w.WriteHeader(404)
		return 
	}

	w.WriteHeader(200)

	fmt.Println("ingredient_id:", id," foi encontrado")
}

//Atualiza informações de um usuário e salva no db
func UpdateIngredientById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	partes := strings.Split(r.URL.Path,"/")

	if len(partes) > 3 {
		//w.WriteHeader(http.StatusNotFound)
		w.WriteHeader(400)
		return
	}

	id, err := strconv.Atoi(partes[2])
	if err != nil {
		w.WriteHeader(404)
		return 
	}

	w.WriteHeader(200)

	fmt.Println("ingredient_id:", id," foi Atualizado")
}

//Apaga usuário do db
func DeleteIngredientById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	partes := strings.Split(r.URL.Path,"/")

	if len(partes) > 3 {
		//w.WriteHeader(http.StatusNotFound)
		w.WriteHeader(400)
		return
	}

	id, err := strconv.Atoi(partes[2])
	if err != nil {
		w.WriteHeader(404)
		return 
	}

	w.WriteHeader(200)

	fmt.Println("ingredient_id:", id," foi deletado")
}
