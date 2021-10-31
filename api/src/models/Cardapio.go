package models

import "time"

type Cardapio struct{
	ID			uint64		`json:"id,omitempty"`
	Name		string		`json:"name,omitempty"`
	Description string		`json:"description,omitempty"`
	Receita		string		`json:"receita,omitempty"`
	Ceated_at	time.Time	`json:"created_at,omitempty"`
}