package main

import (
	"./src/router"
	"fmt"
	"log"
	"net/http"
)

func main() {
	fmt.Println("Rodando API")

	router := router.Gerar()
	log.Fatal(http.ListenAndServe(":5000", router))
}
