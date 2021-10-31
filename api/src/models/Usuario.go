package models

import (
	"errors"
	"strings"
	"time"
)

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
	Id_cardapio    uint8 `json:"id_cardapio,omitempty"`
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

func (cliente *Cliente) Preparar(etapa string) error {
	if erro := cliente.validar(etapa); erro != nil {
		return erro
	}

	cliente.formatar()
	return nil
}

func (cliente *Cliente) validar(etapa string) error {
	if cliente.Nome == "" {
		return errors.New("o nome é obrigatório e não pode estar em branco")
	}

	if cliente.Email == "" {
		return errors.New("o e-mail é obrigatório e não pode estar em branco")
	}

	if etapa == "cadastro" && cliente.Senha == "" {
		return errors.New("a senha é obrigatória e não pode estar em branco")
	}

	return nil
}

func (cliente *Cliente) formatar() {
	cliente.Nome = strings.TrimSpace(cliente.Nome)
	cliente.Email = strings.TrimSpace(cliente.Email)
}

func (nutricionista *Nutricionista) Preparar() error {
	if erro := nutricionista.validar(); erro != nil {
		return erro
	}

	nutricionista.formatar()
	return nil
}

func (nutricionista *Nutricionista) validar() error {
	if nutricionista.Nome == "" {
		return errors.New("o nome é obrigatório e não pode estar em branco")
	}

	if nutricionista.Email == "" {
		return errors.New("o e-mail é obrigatório e não pode estar em branco")
	}

	if nutricionista.Senha == "" {
		return errors.New("a senha é obrigatória e não pode estar em branco")
	}

	return nil
}

func (nutricionista *Nutricionista) formatar() {
	nutricionista.Nome = strings.TrimSpace(nutricionista.Nome)
	nutricionista.Email = strings.TrimSpace(nutricionista.Email)
}

func (administrador *Administrador) Preparar() error {
	if erro := administrador.validar(); erro != nil {
		return erro
	}

	administrador.formatar()
	return nil
}

func (administrador *Administrador) validar() error {
	if administrador.Nome == "" {
		return errors.New("o nome é obrigatório e não pode estar em branco")
	}

	if administrador.Email == "" {
		return errors.New("o e-mail é obrigatório e não pode estar em branco")
	}

	if administrador.Senha == "" {
		return errors.New("a senha é obrigatória e não pode estar em branco")
	}

	return nil
}

func (administrador *Administrador) formatar() {
	administrador.Nome = strings.TrimSpace(administrador.Nome)
	administrador.Email = strings.TrimSpace(administrador.Email)
}
