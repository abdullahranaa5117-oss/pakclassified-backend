const express = require('express');
const router = express.Router();
const Country = require('../Controller/Country.controller');

router.post('/', Country.createCountry);
router.get('/', Country.getAllCountry);
router.put('/:id', Country.updateCountry);
router.delete('/:id', Country.deleteCountry);

module.exports = router;
