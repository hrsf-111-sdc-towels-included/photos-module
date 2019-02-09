const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/picture-viewer');

const pictureViewerSchema = new mongoose.Schema({
  homeId: Number,
  url: String,
  is_primary: Boolean,
});

const DataModel = mongoose.model('DataModel', pictureViewerSchema);

const getAll = (input, callback) => {
  DataModel.find(input, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

module.exports.getAll = getAll;
