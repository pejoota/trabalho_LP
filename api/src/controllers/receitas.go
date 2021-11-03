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
//"strconv"
//"time"

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

	query := "INSERT INTO receitas (nome, descricao) VALUES ('"+receita.Nome+"','"+receita.Descricao+"') RETURNING id_receita, nome, descricao, datacriacao "

	sqlStatement, err := db.Query(query)
	if err != nil {
		w.WriteHeader(400)
        panic(err.Error())
	}

	for sqlStatement.Next() {
		err = sqlStatement.Scan(&receita.Id_receita,&receita.Nome,&receita.Descricao,&receita.DataCriacao)
		if err != nil {
			panic(err.Error())
		}
		json.NewEncoder(w).Encode(receita)
		fmt.Println("Receita Criado com id: ",receita.Id_receita)
    }

	for i := 0; i < len(receita.Ingredients); i++ {

		db.QueryRow(
			"INSERT INTO receitas_ingredients (ingredients, id_receita, preparo) VALUES ($1, $2, $3)",
			receita.Ingredients[i],
			receita.Id_receita,
			receita.Preparo,
		)
		
	}
	defer db.Close()
}

func GetAllReceitas(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	query := "SELECT a.id_receita,a.nome, a.descricao,b.ingredients, b.preparo FROM receitas AS a INNER JOIN receitas_ingredients AS b ON a.id_receita = b.id_receita "
	//query := "select array_to_json(array_agg(row_to_json(receitas_alias))) from (select id_receita as \"id\",nome as \"nome\", descricao as \"descricao\", datacriacao as \"dataCriacao\" from receitas) receitas_alias"
	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	//Funcional
	const numero = 5
	var aux [5]models.Receita
	n := 0
	for sqlStatement.Next() {
        err = sqlStatement.Scan(&aux[n].Id_receita,&aux[n].Nome,&aux[n].Descricao,&aux[n].Ingredients,&aux[n].Preparo)
        if err != nil {
			panic(err.Error())
		}
		n++
	}
	json.NewEncoder(w).Encode(aux)
	//w.Write([]byte(aux))

	fmt.Println("Listando todas as receitas")

	defer db.Close()
}

func GetReceitaById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "aplication/json")
	params := mux.Vars(r)

	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	//query := "SELECT a.id_receita,a.nome, a.descricao,b.ingredients, b.preparo FROM receitas AS a INNER JOIN receitas_ingredients AS b ON a.id_receita = b.id_receita "
	//query := "SELECT a.id_receita,a.nome, a.descricao,b.ingredients, b.preparo FROM receitas WHERE id_receitas = "+params["receitas_id"]+" AS a INNER JOIN receitas_ingredients AS b ON a.id_receita = b.id_receita "
	query := "SELECT a.id_receita,a.nome, a.descricao,b.ingredients, b.preparo FROM receitas AS a INNER JOIN receitas_ingredients AS b ON a.id_receita = b.id_receita WHERE a.id_receita = "+params["receitas_id"]
	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	for sqlStatement.Next() {

        var receita models.Receita

		err = sqlStatement.Scan(&receita.Id_receita,&receita.Nome,&receita.Descricao,&receita.Ingredients,&receita.Preparo)
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

	fmt.Println("receita_id:", receita.Id_receita," foi Atualizado")
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

func confere_receitas() int{
	db, err := config.Conectar()
	if db == nil {
        panic(err.Error())
    }

	//query := "SELECT id_ingredients from ingredients"


	var query string 
	query = "SELECT id_receita from receitas"


	sqlStatement, err := db.Query(query)
	if err != nil {
        panic(err.Error())
    }

	var aux int
	aux = 0
	for sqlStatement.Next() {	
		aux++
    }
	defer db.Close()
	return aux
}