package rotas

import (
	"api/src/controllers"

	"net/http"
)

var rotasReceita = []Rota{
	{
		URI:                "/receitas",
		Metodo:             http.MethodPost,
		Funcao:             controllers.CreateReceita,
		RequerAutenticacao: false,
	},

	{
		URI:                "/receitas",
		Metodo:             http.MethodGet,
		Funcao:             controllers.GetAllReceitas,
		RequerAutenticacao: false,
	},

	{
		URI:                "/receitas/{receitas_id}",
		Metodo:             http.MethodGet,
		Funcao:             controllers.GetReceitaById,
		RequerAutenticacao: false,
	},

	{
		URI:                "/receitas/{receitas_id}",
		Metodo:             http.MethodPut,
		Funcao:             controllers.UpdateReceitaById,
		RequerAutenticacao: false,
	},

	{
		URI:                "/receitas/{receitas_id}",
		Metodo:             http.MethodDelete,
		Funcao:             controllers.DeleteReceitaById,
		RequerAutenticacao: false,
	},
}