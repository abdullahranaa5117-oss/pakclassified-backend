const express = require('express');
const router = express.Router();
const Province = require('../Controller/Province.controller');


router.post('/', Province.createProvince);
router.get('/', Province.getAllProvince);

router.put('/:id', Province.updateProvince);
router.delete('/:id', Province.deleteProvince);
module.exports = router;
