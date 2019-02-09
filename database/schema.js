const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/picture-viewer', { useNewUrlParser: true });

const pictureViewerSchema = new mongoose.Schema({
  homeId: Number,
  url: String,
  is_primary: Boolean,
});

const DataModel = mongoose.model('DataModel', pictureViewerSchema);

const s3BucketPath = 'https://s3-us-west-1.amazonaws.com/ch0psh0p-bread4bed/';

const houseList = [
  'houseImage_11',
  'houseImage_14',
  'houseImage_16',
  'houseImage_20',
  'houseImage_22',
  'houseImage_24',
  'houseImage_26',
  'houseImage_31',
  'houseImage_45',
  'houseImage_47',
];
const otherPicsList = [
  'bathroomImage_14',
  'bathroomImage_15',
  'bathroomImage_16',
  'bathroomImage_22',
  'bathroomImage_28',
  'bathroomImage_3',
  'bathroomImage_37',
  'bathroomImage_41',
  'bathroomImage_48',
  'bathroomImage_5',
  'bedroomImage_18',
  'bedroomImage_19',
  'bedroomImage_30',
  'bedroomImage_31',
  'bedroomImage_34',
  'bedroomImage_38',
  'bedroomImage_8',
  'fireplaceImage_10',
  'fireplaceImage_11',
  'fireplaceImage_18',
  'fireplaceImage_2',
  'fireplaceImage_21',
  'fireplaceImage_23',
  'fireplaceImage_24',
  'fireplaceImage_31',
  'fireplaceImage_4',
  'fireplaceImage_7',
  'gardenImage_10',
  'gardenImage_25',
  'gardenImage_27',
  'gardenImage_3',
  'gardenImage_49',
  'gardenImage_5',
  'kitchenImage_44',
  'petsImage_15',
  'petsImage_17',
  'petsImage_27',
  'petsImage_36',
  'petsImage_40',
  'staged-bedroom-1024x576.jpg',
];

// for i in 100 load 1 house photo and 4 other random pictures, no overlap
const getRandomPic = () => {
  return Math.floor(Math.random() * 50);
};


let i;
let j;
const mongoObject = {
  homeId: 0,
  url: '',
  is_primary: false,
};
const promises = [];

for (i = 100; i < 200; i += 1) {
  mongoObject.homeId = i;
  mongoObject.url = s3BucketPath + houseList[i % 10];
  mongoObject.is_primary = true;
  promises.push(DataModel.create(mongoObject));
  for (j = 1; j < 10; j += 1) {
    mongoObject.homeId = i;
    mongoObject.url = s3BucketPath + otherPicsList[getRandomPic()];
    mongoObject.is_primary = false;
    promises.push(DataModel.create(mongoObject));
  }
}

Promise.all(promises).then(() => {
  mongoose.connection.close();
});
