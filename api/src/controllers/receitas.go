package controllers

import(
	"fmt"
	"net/http"
	"io/ioutil"
	"log"
	"api/src/models"
	"api/src/config"
	"encoding/json"
	"github.com/gorilla/mux"
)

func CreateReceita(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Criando receita_id!"))
	corpoRequest, erro := ioutil.ReadAll(r.Body)
	if erro != nil {
		log.Fatal(erro)
	}

	var receita models.Receita

	if erro = json.Unmarshal(corpoRequest, &receita); erro != nil {
		log.Fatal(erro)
	}

	db, erro := config.Conectar()
	if erro != nil {
		log.Fatal(erro)
	}

	query := "INSERT INTO receitas (nome, descricao, id_ingredients) VALUES ('"+receita.Nome+"','"+receita.Descricao+"','"+receita.Id_Ingredient+"')"

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }
	for sqlStatement.Next() {
		w.WriteHeader(200)
		fmt.Println("Criando a receita")
    }
}

func GetAllReceitas(w http.ResponseWriter, r *http.Request) {

}

func GetReceitaById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	params := mux.Vars(r)

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "Select id_receita, nome, descricao, datacriacao from receitas where id_receita = " + params["receitas_id"]

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	for sqlStatement.Next() {

        var receita models.Receita

        err = sqlStatement.Scan(&receita.Id_receita, &receita.Nome, &receita.Descricao, /* &receita.Ingredient,*/ &receita.DataCriacao)
        if err != nil {
			panic(err.Error())
		}
		w.WriteHeader(200)
		
		json.NewEncoder(w).Encode(receita)
		fmt.Println("id_receita:", params["receitas_id"]," foi encontrada")
		return
    }

	w.WriteHeader(404)
	fmt.Println("receita_id:", params["receitas_id"]," NÃO foi encontrada")
}

func UpdateReceitaById(w http.ResponseWriter, r *http.Request) {
	
}

//DELETA RECEITA
func DeleteReceitaById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	params := mux.Vars(r)

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "Delete from receitas where id_receitas = " + params["receitas_id"]

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	for sqlStatement.Next() {	
		return
    }
	w.WriteHeader(410)
	fmt.Println("receita_id:", params["receitas_id"]," foi DELETADA")
}