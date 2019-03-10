const models = require('./models');

//create photos
const addPhoto = (req, res) => {
  models.insertPhotos(req.body, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).end(`Successfully posted`);
    }
  })
}

//read photos
const sendPhotos = (req, res) => {
  models.fetchPhotos(req.params.id, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results.rows);
    }
  });
};

//update photo
const updatePhoto = (req, res) => {
  let data = {
    id: req.params.id,
    description: req.body.photo_description
  };
  models.changePhotoDescription(data, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).end('Successfully updated');
    }
  });
}

//delete photo
const deletePhoto = (req, res) => {
 models.removePhoto(req.params.id, (err, results) => {
   if (err) {
     res.status(400).send(err);
   } else {
     res.status(200).end('Successfully deleted');
   }
 })
}
module.exports = {addPhoto, sendPhotos, updatePhoto, deletePhoto}; 

