const express = require('express');
const path = require('path');
const db = require('../database/index.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'server/index.js')));

app.get('/pictures/:homeId', (req, res) => {
  db.getAll((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
