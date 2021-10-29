package repositorios

import (
	"api/src/models"
	"database/sql"
)

type Usuarios struct {
	db *sql.DB
}

func NovoRepositorioUsuarios(db *sql.DB) *Usuarios {
	return &Usuarios{db}
}

func (repositorio Usuarios) Criar(cliente models.Cliente) (uint64, error) {

	var ID uint64

	erro := repositorio.db.QueryRow(
		"INSERT INTO clientes (nome, email, senha, altura, idade, peso, percgordura, percmassamagra) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_cliente",
		cliente.Nome,
		cliente.Email,
		cliente.Senha,
		cliente.Altura,
		cliente.Idade,
		cliente.Peso,
		cliente.PercGordura,
		cliente.PercMassaMagra,
	).Scan(&ID)

	if erro != nil {
		return 0, erro
	}

	return ID, nil
}

func (repositorio Usuarios) Buscar(nome string) ([]models.Cliente, error) {

	linhas, erro := repositorio.db.Query(
		"SELECT id_cliente, nome, email, datacriacao, id_cardapio, altura, idade, peso, percgordura, percmassamagra FROM clientes WHERE LOWER(nome) LIKE '%' || $1 || '%'",
		nome,
	)
	if erro != nil {
		return nil, erro
	}

	defer linhas.Close()

	var clientes []models.Cliente

	for linhas.Next() {
		var cliente models.Cliente

		if erro = linhas.Scan(
			&cliente.ID,
			&cliente.Nome,
			&cliente.Email,
			&cliente.DataCriacao,
			&cliente.Id_cardapio,
			&cliente.Altura,
			&cliente.Idade,
			&cliente.Peso,
			&cliente.PercGordura,
			&cliente.PercMassaMagra,
		); erro != nil {
			return nil, erro
		}

		clientes = append(clientes, cliente)
	}

	return clientes, nil
}

func (repositorio Usuarios) BuscarPorID(ID uint64) (models.Cliente, error) {
	linhas, erro := repositorio.db.Query(
		"SELECT id_cliente, nome, email, datacriacao, id_cardapio, altura, idade, peso, percgordura, percmassamagra FROM clientes WHERE id_cliente = $1",
		ID,
	)
	if erro != nil {
		return models.Cliente{}, erro
	}
	defer linhas.Close()

	var cliente models.Cliente

	if linhas.Next() {
		if erro = linhas.Scan(
			&cliente.ID,
			&cliente.Nome,
			&cliente.Email,
			&cliente.DataCriacao,
			&cliente.Id_cardapio,
			&cliente.Altura,
			&cliente.Idade,
			&cliente.Peso,
			&cliente.PercGordura,
			&cliente.PercMassaMagra,
		); erro != nil {
			return models.Cliente{}, erro
		}
	}

	return cliente, nil
}

func (repositorio Usuarios) Atualizar(ID uint64, cliente models.Cliente) error {
	statement, erro := repositorio.db.Prepare(
		"UPDATE clientes SET nome = $1, email = $2, id_cardapio = $3, altura = $4, idade = $5 peso = $6, percgordura = $7, percmassamagra = $8 WHERE id_cliente = $9",
	)
	if erro != nil {
		return erro
	}
	defer statement.Close()

	if _, erro = statement.Exec(
		cliente.Nome,
		cliente.Email,
		cliente.Id_cardapio,
		cliente.Altura,
		cliente.Idade,
		cliente.Peso,
		cliente.PercGordura,
		cliente.PercMassaMagra,
		ID,
	); erro != nil {
		return erro
	}

	return nil
}

func (repositorio Usuarios) Deletar(ID uint64) error {

	statement, erro := repositorio.db.Prepare(
		"DELETE FROM clientes WHERE id_cliente = $1",
	)
	if erro != nil {
		return erro
	}
	defer statement.Close()

	if _, erro = statement.Exec(ID); erro != nil {
		return erro
	}

	return nil
}
