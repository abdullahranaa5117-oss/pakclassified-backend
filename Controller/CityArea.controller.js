const CityArea = require('../Models/CityArea.model');
const createCityArea = async (req, res) => {
    try {
        let { Name } = req.body;
        if (!Name) {
            return res.json({message: 'Name are required'});
        }
        const createCityArea = await CityArea.create({ Name });
        res.status(201).json(createCityArea);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const getAllCityArea = async(req,res) => {
    try{
    const getAllCityArea = await CityArea.find();
    return res.status(200).json(getAllCityArea);    
} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const updateCityArea = async(req,res) => {
    try{
    const updateCityArea = await CityArea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(updateCityArea);    
} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const deleteCityArea = async(req,res) => {
    try{
    const deleteCityArea = await CityArea.findByIdAndDelete(req.params.id);
    return res.status(200).json(deleteCityArea);    
} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
};

module.exports ={
    createCityArea,
    getAllCityArea,
    updateCityArea,
    deleteCityArea
};