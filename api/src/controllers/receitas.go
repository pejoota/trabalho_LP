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
	"time"
)

func CreateReceita(w http.ResponseWriter, r *http.Request) {
	//w.Write([]byte("Criando receita_id!"))
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

	query := "INSERT INTO receitas (nome, descricao) VALUES ('"+receita.Nome+"','"+receita.Descricao+"') RETURNING id_receita"

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

func GetAllReceitas(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "SELECT * from receitas"

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	aux := "["
	for sqlStatement.Next() {
		var receita models.Receita
		err = sqlStatement.Scan(&receita.Id_receita, &receita.Nome, &receita.Descricao, &receita.DataCriacao)
		if err != nil {
			panic(err.Error())
		}
		str := fmt.Sprintf("{\"id\":\"%d\",\"nome\":\"%s\",\"descricao\":\"%s\", \"datacriacao\":\"%s\"},", receita.Id_receita, receita.Nome, receita.Descricao, receita.DataCriacao.Format(time.RFC822))
		aux = aux + str
	}
	aux = trimLastChar(aux)
	aux = aux + "]"
	w.Write([]byte(aux))

	fmt.Println("Listando todos os ingredients")

	defer db.Close()
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

        err = sqlStatement.Scan(&receita.Id_receita, &receita.Nome, &receita.Descricao, &receita.DataCriacao)
        if err != nil {
			panic(err.Error())
		}
		
		json.NewEncoder(w).Encode(receita)
		fmt.Println("id_receita:", params["receitas_id"]," foi encontrada")
		return
    }

	w.WriteHeader(404)
	fmt.Println("receita_id:", params["receitas_id"]," NÃO foi encontrada")

	defer db.Close()
}

func UpdateReceitaById(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

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

	query := "UPDATE receitas set nome = '"+receita.Nome+"', descricao = '"+receita.Descricao+"' where id_receita = "+params["receitas_id"]

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	for sqlStatement.Next() {
		return
    }

	w.WriteHeader(200)

	fmt.Println("ingredient_id:", receita.Id_receita," foi Atualizado")
	defer db.Close()
}

//DELETA RECEITA
func DeleteReceitaById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	params := mux.Vars(r)

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "Delete from receitas where id_receita = " + params["receitas_id"]

	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	for sqlStatement.Next() {	
		return
    }
	w.WriteHeader(410)
	w.Write([]byte("deletado"))
	fmt.Println("receita_id:", params["receitas_id"]," foi DELETADA")

	defer db.Close()
}

func trimLastChar(s string) string {
    return s[:len(s)-1]
}