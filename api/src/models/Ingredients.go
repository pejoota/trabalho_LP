package models

import "time"

// Elementos básicos de um ingrediente da aplicação
type Ingredient struct {
	ID          uint64    `json:"id,omitempty"`
	Nome        string    `json:"nome,omitempty"`
	Description string    `json:"nescription,omitempty"`
	DataCriacao time.Time `json:"datacriacao,omitempty"`
}
