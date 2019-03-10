const pool = require('./postgresConnection.js');

const insertPhotos = (props, callback) => {
  pool.query('INSERT INTO photos (home_id, photo_url, photo_description) VALUES ($1, $2, $3)', [props.home_id, props.photo_url, props.photo_description], callback);
}; 

const fetchPhotos = (id, callback) => {
  pool.query('SELECT * FROM photos WHERE home_id = $1', [id], callback);
};

const changePhotoDescription = (data, callback) => {
  pool.query('UPDATE photos SET photo_description = $1 WHERE photo_id = $2)', [data.description, data.id], callback);
}

const removePhoto = (id, callback) => {
  pool.query('DELETE FROM photos WHERE photo_id = $1', [id], callback);
}
module.exports = {insertPhotos, fetchPhotos, changePhotoDescription, removePhoto};