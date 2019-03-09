const express = require('express');
const router = express.Router();
const controller = require('../../database/controllers');

router.get('/:id', controller.sendPhotos)

router.post('/', controller.addPhoto);

router.put('/:id', controller.updatePhoto);

router.delete('/:id', controller.deletePhoto);

module.exports = router;