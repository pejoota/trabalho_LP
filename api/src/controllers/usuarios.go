package controllers

import (
	"api/src/config"
	"api/src/models"
	"api/src/repositorios"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

//Insere usuário no db
func CriarUsuario(w http.ResponseWriter, r *http.Request) {
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
}

//Busca todos os usuário salvos no db
func BuscarTodosUsuarios(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Buscando todos os usuários!"))
}

//Busca um usuário salvo no db
func BuscarUsuario(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Buscando um usuário!"))
}

//Atualiza informações de um usuário e salva no db
func AtualizarUsuario(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Atualizando usuário!"))
}

//Apaga usuário do db
func DeletarUsuario(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Deletando usuário!"))
}
