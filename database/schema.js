const mongoose = require('mongoose');

mongoose.connect('mongodb://database:27017/picture-viewer', { useNewUrlParser: true });

const pictureViewerSchema = new mongoose.Schema({
  homeId: Number,
  url: String,
  thumb_url: String,
  is_primary: Boolean,
  description: String,
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
  'staged-bedroom-1024x576',
];

const someDescriptors = 'Letterpress typewriter leggings you probably haven\'t heard of them selfies glossier blog bushwick air plant occupy farm-to-table. Gluten-free listicle man braid church-key franzen forage heirloom blue bottle four dollar toast gentrify fanny pack meditation. Fingerstache direct trade skateboard 90\'s, occupy lyft vegan iPhone. Raw denim dreamcatcher man braid asymmetrical mixtape art party. Everyday carry cardigan jean shorts coloring book, selfies glossier asymmetrical cornhole cray vaporware. Cloud bread enamel pin hexagon vexillologist, selvage pop-up kitsch unicorn listicle swag banh mi whatever. Biodiesel copper mug tousled chia put a bird on it, schlitz hashtag lomo direct trade wayfarers cardigan sartorial waistcoat. Next level hot chicken ennui small batch pok pok narwhal. Brooklyn edison bulb pinterest, fingerstache unicorn tote bag pop-up ethical. VHS aesthetic synth humblebrag, irony paleo pitchfork bespoke street art deep v succulents green juice fixie selfies. Seitan cronut celiac franzen lyft biodiesel snackwave ethical synth microdosing. Blog snackwave intelligentsia, shaman DIY pug vinyl brooklyn stumptown godard. Fingerstache la croix hella jean shorts, portland lyft stumptown. Microdosing etsy flexitarian williamsburg, paleo cred pok pok you probably haven\'t heard of them letterpress activated charcoal. Pabst cold-pressed ugh freegan, everyday carry cronut trust fund literally microdosing hammock leggings hot chicken. Put a bird on it prism VHS, green juice craft beer activated charcoal la croix food truck. Pok pok keffiyeh ennui, leggings chia prism man braid put a bird on it hell of. Put a bird on it bushwick fashion axe listicle chartreuse. Kombucha neutra four dollar toast ennui, mumblecore yuccie single-origin coffee vice cred jianbing pickled intelligentsia umami squid readymade. Ennui messenger bag prism, tumeric activated charcoal jianbing celiac forage you probably haven\'t heard of them. Dreamcatcher post-ironic flannel, before they sold out humblebrag farm-to-table cloud bread pitchfork keytar VHS artisan. Meggings echo park kitsch poutine hashtag mustache kogi wayfarers blue bottle brunch bicycle rights actually. Tumeric keffiyeh single-origin coffee banh mi, drinking vinegar polaroid semiotics austin activated charcoal vape forage. Hella normcore small batch, 90\'s heirloom chicharrones drinking vinegar. Keffiyeh VHS brunch ugh bushwick street art lumbersexual gastropub typewriter franzen swag offal yuccie cliche meditation. Vexillologist gentrify echo park meditation disrupt taxidermy fashion axe neutra migas coloring book kickstarter art party vinyl pabst. Narwhal helvetica literally, beard shabby chic raclette tumeric pabst semiotics microdosing. Raw denim irony farm-to-table, next level unicorn paleo tousled banh mi. Street art crucifix quinoa, slow-carb jean shorts subway tile you probably haven\'t heard of them lomo typewriter irony authentic.';

const getRandomPicList = () => {
  const out = [];
  while (out.length < 9) {
    const randomIndex = Math.floor(Math.random() * 40);
    if (!out.includes(otherPicsList[randomIndex])) {
      out.push(otherPicsList[randomIndex]);
    }
  }
  return out;
};

const getRandomText = () => {
  const splitText = someDescriptors.split('. ');
  return splitText[Math.floor(Math.random() * splitText.length)];
};

let i;
let j;
const ext = '.jpg';
const prefix = 'thumb_';
const mongoObject = {
  homeId: 0,
  url: '',
  thumb_url: '',
  is_primary: false,
  description: '',
};
const promises = [];

for (i = 100; i < 200; i += 1) {
  mongoObject.homeId = i;
  mongoObject.url = s3BucketPath + houseList[i % 10] + ext;
  mongoObject.thumb_url = s3BucketPath + prefix + houseList[i % 10] + ext;
  mongoObject.is_primary = true;
  mongoObject.description = `${getRandomText()}.`;
  promises.push(DataModel.create(mongoObject));
  const picList = getRandomPicList();
  for (j = 0; j < 9; j += 1) {
    mongoObject.homeId = i;
    mongoObject.url = s3BucketPath + picList[j] + ext;
    mongoObject.thumb_url = s3BucketPath + prefix + picList[j] + ext;
    mongoObject.is_primary = false;
    mongoObject.description = `${getRandomText()}.`;
    promises.push(DataModel.create(mongoObject));
  }
}

Promise.all(promises).then(() => {
  mongoose.connection.close();
});
