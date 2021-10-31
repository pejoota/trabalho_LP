
  
DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes(
    id_cliente     serial primary key,
    nome           varchar(50) not null,
    email          varchar(50) not null unique,
    senha          varchar(30) not null,
    dataCriacao    timestamp default current_timestamp,
    id_cardapio    int,
    altura         int,
    idade          int,
    peso           int, 
    percGordura    int,
    percMassaMagra int,
);

DROP TABLE IF EXISTS nutricionistas;

CREATE TABLE nutricionistas(
    id_nutricionista  serial primary key,
    id_cliente        int,
    nome              varchar(50) not null,
    tipoCRN           int not null,
    CRN               varchar(15) not null unique,
    email             varchar(50) not null unique,
    senha             varchar(30) not null,
    dataCriacao       timestamp default current_timestamp,
);

DROP TABLE IF EXISTS administradores;

CREATE TABLE administradores(
    id_admin    serial primary key,
    nome        varchar(50) not null,
    email       varchar(50) not null unique,
    senha       varchar(30) not null,
    chave       varchar(30) not null,
    dataCriacao timestamp default current_timestamp,
);

DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients(
    id_ingredients      serial primary key,
    nome                varchar(50) not null unique,
    description         varchar(180) not null,
    dataCriacao    timestamp default current_timestamp,
);

DROP TABLE IF EXISTS receitas;

CREATE TABLE receitas(
    id_receita  serial primary key,
    nome        varchar(50) not null unique,
    descricao   varchar(200) not null,
    dataCriacao timestamp default current_timestamp,
);
