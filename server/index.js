require('newrelic'); 
const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const router = require('./router/index.js');

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/../client/dist'))

app.use('/pictures/', router);
// (req, res) => {
//   router(req.params.homeId, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(data);
//     }
//   });
// }

app.listen(port, () => console.log(`Listening on port ${port}!`));
