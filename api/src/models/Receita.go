package models

import "time"

// Elementos básicos de um ingrediente da aplicação
type Receita struct {
	Id_receita  uint64  	`json:"id,omitempty"`
	Nome        string  	`json:"nome,omitempty"`
	Descricao 	string		`json:"description,omitempty"`
	Id_Ingredient []uint64	`json:"ingredient,omitempty`
	DataCriacao time.Time	`json:"datacriacao,omitempty"`
}