package controllers

import "net/http"

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
	w.Write([]byte("Buscando o GetIngredientById!`${ingredient_id}`"))
}

//Atualiza informações de um usuário e salva no db
func UpdateIngredientById(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Atualizando ingredient_id!"))
}

//Apaga usuário do db
func DeleteIngredientById(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Deletando ingredient_id!"))
}
