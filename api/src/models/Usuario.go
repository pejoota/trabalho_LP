package models

import "time"

// Elementos básicos de um usuário da aplicação
type Usuario struct {
	ID          uint64    `json:"id,omitempty"`
	Nome        string    `json:"nome,omitempty"`
	Email       string    `json:"email,omitempty"`
	Senha       string    `json:"senha,omitempty"`
	DataCriacao time.Time `json:"datacriacao,omitempty"`
	Permissao   uint8     `json:"permissao,omitempty"`
}

type Cliente struct {
	Usuario
	Altura         uint8 `json:"altura,omitempty"`
	Idade          uint8 `json:"idade,omitempty"`
	Peso           uint8 `json:"peso,omitempty"`
	PercGordura    uint8 `json:"percGordura,omitempty"`
	PercMassaMagra uint8 `json:"percMassaMagra,omitempty"`
}

type Nutricionista struct {
	Usuario
	TipoCRN uint8  `json:"tipoCRN,omitempty"`
	CRN     string `json:"CRN,omitempty"`
}

type Administrador struct {
	Usuario
	Key string `json:"key,omitempty"`
}
