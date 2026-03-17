const express = require('express');
const router = express.Router();
const AdvertisementCategorycontroller = require('../Controller/AdvertisementCategory.controller');

router.post('/', AdvertisementCategorycontroller.createAdvertisementCategory);
router.get('/with-count', AdvertisementCategorycontroller.categories);
router.get('/', AdvertisementCategorycontroller.getAllAdvertisementCategory);
router.get('/:id', AdvertisementCategorycontroller.GetByIdAdvertismentCategory);
router.put('/:id', AdvertisementCategorycontroller.updateAdvertisementCategory);
router.delete('/:id', AdvertisementCategorycontroller.deleteAdvertisementCategory);

module.exports = router;
