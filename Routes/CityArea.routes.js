const express = require('express');
const router = express.Router();
const CityArea = require('../Controller/CityArea.controller');

router.post('/', CityArea.createCityArea);
router.get('/', CityArea.getAllCityArea);
router.put('/:id', CityArea.updateCityArea);
router.delete('/:id', CityArea.deleteCityArea);

module.exports = router;
    