const express = require('express');
const router = express.Router();
const CityArea = require('../Controller/CityArea.controller');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/',authenticate, CityArea.createCityArea);
router.get('/', CityArea.getAllCityArea);
router.put('/:id',authenticate, CityArea.updateCityArea);
router.delete('/:id',authenticate, CityArea.deleteCityArea);

module.exports = router;
    