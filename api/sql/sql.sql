DROP TABLE IF EXISTS usuarios;

CREATE TABLE clientes(
    id_cliente     serial primary key,
    nome           varchar(50) not null,
    email          varchar(50) not null unique,
    senha          varchar(30) not null,
    dataCriacao    timestamp default current_timestamp,
    peso           int, 
    percGordura    int,
    percMassaMagra int,
);

DROP TABLE IF EXISTS nutricionistas;

CREATE TABLE nutricionistas(
    id_cliente  serial primary key,
    nome        varchar(50) not null,
    tipoCRN     int not null,
    CRN         varchar(15) not null unique,
    email       varchar(50) not null unique,
    senha       varchar(30) not null,
    dataCriacao timestamp default current_timestamp,
);

DROP TABLE IF EXISTS nutricionistas;

CREATE TABLE administrador(
    id_cliente  serial primary key,
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
    description         varchar(30) not null,
    dataCriacao    timestamp default current_timestamp,
);