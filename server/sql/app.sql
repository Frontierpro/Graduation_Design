CREATE DATABASE sketch;

USE sketch;

CREATE TABLE Paper (
    User CHAR(32),
    ID CHAR(10),
    Title VARCHAR(100),
    Status TINYINT
);

CREATE TABLE Reading (
    User CHAR(32),
    ID CHAR(10),
    Items TEXT
);

CREATE TABLE Listening (
    User CHAR(32),
    ID CHAR(10),
    Items TEXT
);

CREATE TABLE Speaking (
    User CHAR(32),
    ID CHAR(10),
    Items TEXT
);

CREATE TABLE Writing (
    User CHAR(32),
    ID CHAR(10),
    Items TEXT
);

CREATE DATABASE result;

use result;

CREATE TABLE Sheet (
    User CHAR(32),
    ID CHAR(10),
    Name CHAR(32),
    Status TINYINT
);

CREATE TABLE Reading (
    User CHAR(32),
    ID CHAR(10),
    Name CHAR(32),
    Title VARCHAR(16),
    Reply TEXT
);

CREATE TABLE Listening (
    User CHAR(32),
    ID CHAR(10),
    Name CHAR(32),
    Title VARCHAR(21),
    Reply TEXT
);

CREATE TABLE Speaking (
    User CHAR(32),
    ID CHAR(10),
    Name CHAR(32),
    Title VARCHAR(13),
    Reply TEXT
);

CREATE TABLE Writing (
    User CHAR(32),
    ID CHAR(10),
    Name CHAR(32),
    Title VARCHAR(18),
    Reply TEXT
);
