CREATE DATABASE IF NOT EXISTS QA;

USE QA;

CREATE TABLE IF NOT EXISTS questions (
  q_id int NOT NULL AUTO_INCREMENT,
  product_id int,
  question_body varchar(200),
  q_date_written datetime NOT NULL,
  asker_name varchar(30),
  asker_email varchar(50),
  q_helpful int default 0,
  q_reported boolean default 0,
  PRIMARY KEY(q_id)
);

CREATE INDEX productId ON questions (product_id);

CREATE TABLE IF NOT EXISTS answers (
  a_id int NOT NULL AUTO_INCREMENT,
  question_id int NOT NULL,
  answer_body varchar(200) NOT NULL,
  a_date_written datetime NOT NULL,
  answerer_name varchar(30) NOT NULL,
  answerer_email varchar(50) NOT NULL,
  a_helpful int default 0,
  a_reported boolean default 0,
  PRIMARY KEY(a_id),
  FOREIGN KEY(question_id)
    REFERENCES questions(q_id)
);

-- CREATE INDEX questionId ON answers (question_id); not sure if needed

CREATE TABLE IF NOT EXISTS photos (
  p_id int NOT NULL AUTO_INCREMENT,
  answer_id int NOT NULL,
  url varchar(255) NOT NULL,
  PRIMARY KEY(p_id),
  FOREIGN KEY(answer_id)
    REFERENCES answers(a_id)
);

-- CREATE INDEX answerId ON photos (answer_id); not sure if needed

-- to run sql file run mysql -u root < schema.sql