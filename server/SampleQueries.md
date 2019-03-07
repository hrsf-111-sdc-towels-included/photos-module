#Sample Queries
---

####1) Add a photo to a home:
`insert into photos (home_id,photo_url,photo_description) values (100000005, 'http://lorempixel.com/640/480','Incredible');`

#####Results:

* PostgreSQL: .311ms

* Cassandra: 4.031ms

####2) Retrieve all photos from a home
`select * from photos where home_id = 9999999;`

#####Results:

* PostgreSQL: 3.258ms

* Cassandra: 14.991ms

####3) Update a photo and description
`update photos set photo_description = 'Blue room' where photo_id = 9999999;`

#####Results:

* PostgreSQL: 2.262ms

* Cassandra: 6.539ms

####4) Delete a photo
`delete from photos where photo_id = 100000000;`

#####Results:

* PostgreSQL: 1.409ms

* Cassandra: 1.797ms