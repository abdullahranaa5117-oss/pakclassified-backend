const Advertisement = require('../Models/Advertisement.model');

const createAdvertisement = async (req, res) => {
    try {
        const { Name, Description, Price, StartsOn, EndsOn, Category, CityArea } = req.body;

        if (!Name || !Description || !Price === undefined || !StartsOn || !EndsOn || !Category || !CityArea) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        const newAd = await Advertisement.create({
            Name,
            Description,
            Price,
            StartsOn,
            EndsOn,
            Category,
            CityArea,
            Images: imagePath,
            PostedBy: req.user.id
        });

        res.status(201).json(newAd);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getAllAdvertisement = async (req, res) => {
    try {
        const query = {};
        if (req.query.Keyword) query.Name = { $regex: req.query.Keyword, $options: "i" };

        if (req.query.category) query.Category = req.query.category;
        else if (req.query.Category) query.Category = req.query.Category;

        if (req.query.cityarea) query.CityArea = req.query.cityarea;
        else if (req.query.CityArea) query.CityArea = req.query.CityArea;

        const ads = await Advertisement.find(query)
            .populate('Category', 'Name')
            .populate('CityArea', 'Name')
            .populate('PostedBy');

        res.status(200).json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getlatestAds = async (req, res) => {
    try {
        const ads = await Advertisement.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .populate('Category', 'Name')
            .populate('CityArea', 'Name')
            .populate('PostedBy', 'Name Email');

        res.status(200).json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getMyAds = async (req, res) => {
    try {
        const ads = await Advertisement.find({ PostedBy: req.user.id })
            .populate('Category', 'Name')
            .populate('CityArea', 'Name');

        res.status(200).json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const GetByIdAdvertisement = async (req, res) => {
    try {
        const ad = await Advertisement.findById(req.params.id)
            .populate('Category', 'Name')
            .populate('CityArea', 'Name')
            .populate('PostedBy', 'Name Email');

        if (!ad) return res.status(404).json({ message: `Advertisement with id ${req.params.id} not found` });

        res.status(200).json(ad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateAdvertisement = async (req, res) => {
    console.log("REQ.FILE:", req.file);
    console.log("REQ.BODY:", req.body);

    try {
        const ad = await Advertisement.findById(req.params.id);
        if (!ad) return res.status(404).json({ message: "Advertisement not found" });
        if (ad.PostedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        if (req.file) {
            req.body.Images = `/uploads/${req.file.filename}`;
        }

        const updatedAd = await Advertisement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedAd);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteAdvertisement = async (req, res) => {
    try {
        const ad = await Advertisement.findById(req.params.id);
        if (!ad) return res.status(404).json({ message: "Advertisement not found" });
        if (ad.PostedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Advertisement.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Advertisement deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createAdvertisement,
    getAllAdvertisement,
    getlatestAds,
    getMyAds,
    GetByIdAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
};

