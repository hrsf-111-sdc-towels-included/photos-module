const express = require('express');
const path = require('path');
const parse = require('body-parser');
const expressStaticGzip = require('express-static-gzip');
const db = require('../database/index.js');


const app = express();
const port = 3001;

app.use(parse.json());

// app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use('/', expressStaticGzip(path.join(__dirname, '/../client/dist'), {
  enableBrotli: true,
  customCompressions: [{
    encodingName: 'deflate',
    fileExtension: 'zz',
  }],
  orderPreference: ['br', 'gz'],
}));

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/pictures/:homeId', (req, res) => {
  db.getAll(req.params.homeId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
