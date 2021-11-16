CREATE DATABASE IF NOT EXISTS QA;

USE QA;

CREATE TABLE IF NOT EXISTS questions (
  id int NOT NULL AUTO_INCREMENT,
  product_id int,
  body varchar(255),
  date_written datetime NOT NULL,
  asker_name varchar(255),
  asker_email varchar(255),
  helpful int default 0,
  reported boolean default 0,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS answers (
  id int NOT NULL AUTO_INCREMENT,
  question_id int NOT NULL,
  body varchar(255) NOT NULL,
  date_written datetime NOT NULL,
  answerer_name varchar(255) NOT NULL,
  answerer_email varchar(255) NOT NULL,
  helpful int default 0,
  reported boolean default 0,
  PRIMARY KEY(id),
  FOREIGN KEY(question_id)
    REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id int NOT NULL AUTO_INCREMENT,
  answer_id int NOT NULL,
  url varchar(255) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(answer_id)
    REFERENCES answers(id)
);

-- to run sql file run mysql -u root < schema.sql