const City = require('../Models/City.model');
const createCity = async (req, res) => {
    try {
        let { Name } = req.body;
        if (!Name) {
            return res.json({ message: 'Name are required' });
        }
        const createCity = await City.create({ Name });
        res.status(201).json(createCity);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const getAllCity = async (req, res) => {
    try {
        const getAllCity = await City.find().populate({
            path: 'Province',
            populate: {
                path: 'Country'
            }
        });
        return res.status(200).json(getAllCity);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const updateCity = async (req, res) => {
    try {
        const updateCity = await City.findByIdAndUpdate();
        return res.status(200).json(updateCity);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const deleteCity = async (req, res) => {
    try {
        const deleteCity = await City.findByIdAndDelete();
        return res.status(200).json(deleteCity);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
};

module.exports = {
    createCity,
    getAllCity,
    updateCity,
    deleteCity
};