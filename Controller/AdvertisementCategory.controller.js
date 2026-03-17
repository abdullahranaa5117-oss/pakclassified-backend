const AdvertisementCategory = require('../Models/AdvertisementCategory.model');
const createAdvertisementCategory = async (req, res) => {
    try {
        let { Name, Image } = req.body;
        if (!Name || !Image) {
            return res.json({ message: 'Name and Image are required' });
        }
        const createAdvertisementCategory = await AdvertisementCategory.create({ Name, Image });
        res.status(201).json(createAdvertisementCategory);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}

const categories = async (req, res) => {
    try {
        const categories = await AdvertisementCategory.aggregate([
            {
                $lookup: {
                    from: "advertisements",
                    localField: "_id",
                    foreignField: "Category",
                    as: "ads"
                }
            },
            {
                $project: {
                    Name: 1,
                    Image: 1,
                    adsCount: { $size: "$ads" }
                }
            }
        ]);
        res.status(200).json(categories)
    } catch (err) {

        res.status(500).json({ message: err.message })
    }

}



const getAllAdvertisementCategory = async (req, res) => {
    try {
        const getAllAdvertisementCategory = await AdvertisementCategory.find();
        return res.status(200).json(getAllAdvertisementCategory);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const GetByIdAdvertismentCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const found = await AdvertisementCategory.findById(id);
        if (!found) return res.status(404).json({ message: `Adscategory with id ${id} not found` });
        return res.status(200).json(found);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const updateAdvertisementCategory = async (req, res) => {
    try {
        const updateAdvertisementCategory = await AdvertisementCategory.findByIdAndUpdate(req.params.id,
            req.body,
            { new: true });
        return res.status(200).json(updateAdvertisementCategory);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const deleteAdvertisementCategory = async (req, res) => {
    try {
        const deleteAdvertisementCategory = await AdvertisementCategory.findByIdAndDelete(req.params.id );
        return res.status(200).json(deleteAdvertisementCategory);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
};

module.exports = {
    createAdvertisementCategory,
    categories,
    getAllAdvertisementCategory,
    GetByIdAdvertismentCategory,
    updateAdvertisementCategory,
    deleteAdvertisementCategory
};