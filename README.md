# SDC-QA
SDC branch handling questions and answers


SELECT *
    FROM answers a, questions q, photos p
    WHERE q.product_id = 2
    AND a.question_id = q.id
    AND a.id = p.answer_id
    LIMIT 10;

Commands for loading CSV files into MySQL database

might need to run this before loading local files
SET GLOBAL local_infile=1;

questions
LOAD DATA LOCAL INFILE '/Users/ErikDanTran/Desktop/bootcamp/SDC-QA/CSV-Data/questions.csv' INTO TABLE questions FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) SET date_written = FROM_UNIXTIME(date_written/1000,'%Y-%m-%d %H:%i:%s %p');

answers
LOAD DATA LOCAL INFILE '/Users/ErikDanTran/Desktop/bootcamp/SDC-QA/CSV-Data/answers.csv' INTO TABLE answers FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) SET date_written = FROM_UNIXTIME(date_written/1000,'%Y-%m-%d %H:%i:%s %p');

photos
LOAD DATA LOCAL INFILE '/Users/ErikDanTran/Desktop/bootcamp/SDC-QA/CSV-Data/answers_photos.csv' INTO TABLE photos FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (id, answer_id, url);
