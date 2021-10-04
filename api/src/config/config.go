package config

import (
	"database/sql"
	"fmt"
)

const PostgresDriver = "postgres"
const User = "paulo"
const Host = "177.73.70.12"
const Port = "38887"
const Password = "ysBn4YbMM*H%"
const DbName = "trabalho_lp"

var DataSourceName = fmt.Sprintf("host=%s port=%s user=%s "+
	"password=%s dbname=%s sslmode=disable", Host, Port, User, Password, DbName)

var db *sql.DB
var err error

func Conectar() (*sql.DB, error) {

	fmt.Printf("Accessing %s ... ", DbName)
	db, err = sql.Open(PostgresDriver, DataSourceName)

	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		db.Close()
		return nil, err
	}

	fmt.Println("Connected!")

	return db, nil
}
