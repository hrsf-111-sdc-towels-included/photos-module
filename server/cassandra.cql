DROP KEYSPACE IF EXISTS towels_included;

CREATE KEYSPACE towels_included WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

use towels_included;

tracing on;

CREATE TABLE photos (
    photo_id VARINT,
    home_id VARINT,
    photo_url VARCHAR,
    photo_description VARCHAR,
    PRIMARY KEY(photo_id, home_id)
);

COPY photos(photo_id,home_id,photo_url,photo_description) FROM 'cassandra.csv';