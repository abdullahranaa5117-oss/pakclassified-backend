const express = require('express');
const router = express.Router();
const City = require('../Controller/City.controller');

router.post('/', City.createCity);
router.get('/', City.getAllCity);
router.put('/:id', City.updateCity);
router.delete('/:id', City.deleteCity);

module.exports = router;
