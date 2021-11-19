# SDC-QA
SDC branch handling questions and answers

worse way to do it, use joins instead
SELECT *
    FROM answers a, questions q, photos p
    WHERE q.product_id = 2
    AND a.question_id = q.id
    AND a.id = p.answer_id
    LIMIT 10;


SELECT *
FROM questions q
LEFT JOIN answers a ON a.question_id=q.id
LEFT JOIN photos p ON p.answer_id=a.id
WHERE q.product_id=2
LIMIT 100;


Commands for loading CSV files into MySQL database

might need to run this before loading local files
SET GLOBAL local_infile=1;

questions
LOAD DATA LOCAL INFILE '/Users/ErikDanTran/Desktop/bootcamp/SDC-QA/CSV-Data/questions.csv' INTO TABLE questions FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (q_id, product_id, question_body, q_date_written, asker_name, asker_email, q_reported, q_helpful) SET q_date_written = FROM_UNIXTIME(q_date_written/1000,'%Y-%m-%d %H:%i:%s %p');

answers
LOAD DATA LOCAL INFILE '/Users/ErikDanTran/Desktop/bootcamp/SDC-QA/CSV-Data/answers.csv' INTO TABLE answers FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (a_id, question_id, answer_body, a_date_written, answerer_name, answerer_email, a_reported, a_helpful) SET a_date_written = FROM_UNIXTIME(a_date_written/1000,'%Y-%m-%d %H:%i:%s %p');

photos
LOAD DATA LOCAL INFILE '/Users/ErikDanTran/Desktop/bootcamp/SDC-QA/CSV-Data/answers_photos.csv' INTO TABLE photos FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (p_id, answer_id, url);
