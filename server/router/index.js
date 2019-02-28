const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.status(200);
  res.send('Read photo successful.');
});

router.post('/', (req, res) => {
  res.status(201);
  res.send('Photo was successfully posted.');
});
router.put('/', (req, res) => {
  res.send(201);
  res.send('Photo was successfully updated.');
});
router.delete('/:id', (req, res) => {
  res.send(200);
  res.send('Photo was successfully deleted.');
});

module.exports = router;