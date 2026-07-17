const express = require('express');
const router = express.Router();
const AdvertisementCategorycontroller = require('../Controller/AdvertisementCategory.controller');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/',authenticate, AdvertisementCategorycontroller.createAdvertisementCategory);
router.get('/with-count', AdvertisementCategorycontroller.categories);
router.get('/', AdvertisementCategorycontroller.getAllAdvertisementCategory);
router.get('/:id', AdvertisementCategorycontroller.GetByIdAdvertismentCategory);

router.put('/:id',authenticate, AdvertisementCategorycontroller.updateAdvertisementCategory);
router.delete('/:id',authenticate, AdvertisementCategorycontroller.deleteAdvertisementCategory);

module.exports = router;
