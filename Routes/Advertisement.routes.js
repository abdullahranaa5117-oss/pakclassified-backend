const express = require('express');
const router = express.Router();
const Advertisementcontroller = require('../Controller/Advertisement.controller');
const { authenticate } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})
const upload = multer({ storage });

router.post('/', authenticate, upload.single('Images'), Advertisementcontroller.createAdvertisement);

router.get('/', Advertisementcontroller.getAllAdvertisement);
router.get('/latest', Advertisementcontroller.getlatestAds);
router.get('/my/ads', authenticate, Advertisementcontroller.getMyAds);
router.get('/:id', Advertisementcontroller.GetByIdAdvertisement);
router.put('/:id', authenticate, upload.single('Images'),Advertisementcontroller.updateAdvertisement);
router.delete('/:id', authenticate, Advertisementcontroller.deleteAdvertisement);

module.exports = router;
