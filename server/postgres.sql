DROP DATABASE IF EXISTS towels_included;

CREATE DATABASE towels_included;

\c towels_included;

CREATE TABLE photos (
    photo_id SERIAL PRIMARY KEY,
    home_id INT,
    photo_url VARCHAR,
    photo_description VARCHAR
);

\copy photos(home_id,photo_url,photo_description) FROM '/Users/shelly/Desktop/SDC/picture-view-module/server/postgres.csv' DELIMITER ',' CSV;