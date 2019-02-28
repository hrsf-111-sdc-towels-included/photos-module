## TowelsIncluded: Photos API
----

### TowelsIncluded.photos  

#### GET `api/photos/:id`

  Returns a photo at a given photo id. 

##### URL Params

* id (Integer)

##### Success Response:
  
* ##### Code: 200
 
* ##### Error Response:

  * **Code:** 400 Bad Request Error 
    **Content:** `{ error : "Bad Request Error" }`

#### POST `api/photos`

Returns the ID of the photo created in the database.

##### Payload Params

JSON object as listed below:

| Key           | Type          |
| ------------- |:-------------:|
| home_id       | Number        |
| url           | String        |
| description   | String        |


##### Success Response:
  
* ##### Code: 201
 
* ##### Error Response:

  * **Code:** 400 Bad Request Error 
    **Content:** `{ error : "Bad Request Error" }`

#### PUT `api/photos/:id`

##### URL Params

* id (Integer)

##### Payload Params

JSON object as listed below:

| Key           | Type          |
| ------------- |:-------------:|
| home_id       | Number        |
| url           | String        |
| description   | String        |

  Returns the ID of the photo edited in the database. 

##### Success Response:
  
* ##### Code: 201
 
* ##### Error Response:

  * **Code:** 400 Bad Request Error 
    **Content:** `{ error : "Bad Request Error" }`

#### DELETE `api/photos/:id`

  Returns the ID of the photo to be deleted in the database. 

##### URL Params

* id (Integer)

##### Success Response:
  
* ##### Code: 200
 
* ##### Error Response:

  * **Code:** 400 Bad Request Error 
    **Content:** `{ error : "Bad Request Error" }`


