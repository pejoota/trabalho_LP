package models

import "time"

// Elementos básicos de um ingrediente da aplicação
type Receita struct {
	Id_receita  uint64  	`json:"id,omitempty"`
	Nome        string  	`json:"nome,omitempty"`
	Ingredients string	`json:"ingredients,omitempty"`
	Preparo string			`json:"preparo,omitempty"`
	Descricao 	string		`json:"descricao,omitempty"`
	DataCriacao time.Time	`json:"datacriacao,omitempty"`
	Imagem string			`json:"imagem,omitempty"`
}