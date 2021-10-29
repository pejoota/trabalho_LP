package controllers

import (
	"net/http"
	"api/src/config"
	"api/src/models"
	"api/src/repositorios"
	"encoding/json"
	"io/ioutil"
	"log"
)

//Insere cardápio no db
func CriarCardapio(w http.ResponseWriter, r *http.Request) {
	corpoRequest, erro := ioutil.ReadAll(r.Body)

	if erro != nil {
		log.Fatal(erro)
	}

	var cliente models.Cliente

	if erro = json.Unmarshal(corpoRequest, &cliente); erro != nil {
		log.Fatal(erro)
	}

	db, erro := config.Conectar()

	if erro != nil {
		log.Fatal(erro)
	}

	repositorio := repositorios.NovoRepositorioUsuarios(db)
	repositorio.Criar(cliente)
	w.Write([]byte("Buscando todos os cardápios!"))
}

//Busca todos os cardápio salvos no db
func BuscarTodosCardapios(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Buscando todos os cardápios!"))
}

//Busca um cardápio salvo no db
func BuscarCardapio(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Buscando um cardápio!"))
}

//Atualiza informações de um cardápio e salva no db
func AtualizarCardapio(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Atualizando cardápio!"))
}

//Apaga cardápio do db
func DeletarCardapio(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Deletando cardápio!"))
}
