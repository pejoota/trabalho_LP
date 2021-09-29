package router

import (
	"./rotas"

	"github.com/gorilla/mux"
)

// Retorna um router com as rotas configuradas
func Gerar() *mux.Router {
	r := mux.NewRouter()
	return rotas.Configurar(r)
}
