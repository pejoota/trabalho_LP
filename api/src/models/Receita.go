package models

import "time"

// Elementos básicos de um ingrediente da aplicação
type Receita struct {
	Id_receita  uint64  	`json:"id,omitempty"`
	Nome        string  	`json:"nome,omitempty"`
	Ingredients []uint64		`json:"ingredients,omitempty"`
	Descricao 	string		`json:"descricao,omitempty"`
	DataCriacao time.Time	`json:"datacriacao,omitempty"`
}