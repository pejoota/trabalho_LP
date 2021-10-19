package rotas

import (
	"api/src/controllers"

	"net/http"
)

var rotasIngredients = []Rota{

	{
		URI:                "/ingredients",
		Metodo:             http.MethodPost,
		Funcao:             controllers.CreateIngredient,
		RequerAutenticacao: false,
	},

	{
		URI:                "/ingredients",
		Metodo:             http.MethodGet,
		Funcao:             controllers.GetAllIngredients,
		RequerAutenticacao: false,
	},

	{
		URI:                "/ingredients/{ingredients_id}",
		Metodo:             http.MethodGet,
		Funcao:             controllers.GetIngredientById,
		RequerAutenticacao: false,
	},

	{
		URI:                "/ingredients/{ingredients_id}",
		Metodo:             http.MethodPut,
		Funcao:             controllers.UpdateIngredientById,
		RequerAutenticacao: false,
	},

	{
		URI:                "/ingredients/{ingredients_id}",
		Metodo:             http.MethodDelete,
		Funcao:             controllers.DeleteIngredientById,
		RequerAutenticacao: false,
	},
}
