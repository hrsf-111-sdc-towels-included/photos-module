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

| Key           | Type          | Description          |
| ------------- |:-------------:| -------------:|
| home_id       | Number        | The ID that uniquely identifies each home.|
| photo_url           | String        | The URL to each photo that is listed for the home.|
| photo_description   | String        | The description string contains details about the photo.|


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

| Key           | Type          | Description          |
| ------------- |:-------------:| -------------:|
| home_id       | Number        | The ID that uniquely identifies each home.|
| photo_url           | String        | The URL to each photo that is listed for the home.|
| photo_description   | String        | The description string contains details about the photo.|

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




