DROP KEYSPACE IF EXISTS towels_included_optimized;

CREATE KEYSPACE towels_included_optimized WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};

use towels_included_optimized;

tracing on;

CREATE TABLE photos (
    photo_id VARINT PRIMARY KEY,
    home_id VARINT,
    photo_url VARCHAR,
    photo_description VARCHAR,
);

CREATE INDEX ON photos (home_id);

COPY photos(photo_id,home_id,photo_url,photo_description) FROM 'cassandra.csv';