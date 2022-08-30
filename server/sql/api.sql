CREATE DATABASE tpo CHARACTER SET utf8;

USE tpo;

CREATE TABLE reading (
    section TINYINT,
    id TINYINT,
    dist TEXT
) DEFAULT CHARSET=utf8;

CREATE TABLE listening (
    section TINYINT,
    id TINYINT,
    dist TEXT
) DEFAULT CHARSET=utf8;

CREATE TABLE speaking (
    section TINYINT,
    id TINYINT,
    dist TEXT
) DEFAULT CHARSET=utf8;

CREATE TABLE writing (
    section TINYINT,
    id TINYINT,
    dist TEXT
) DEFAULT CHARSET=utf8;
