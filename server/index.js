const express = require('express');
const path = require('path');
const parse = require('body-parser');
const db = require('../database/index.js');


const app = express();
const port = 3001;

app.use(parse.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/pictures/:homeId', (req, res) => {
  db.getAll(req.params.homeId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port} ${path.url}!`));
