const Country = require('../Models/Country.model');
const createCountry = async (req, res) => {
    try {
        let { Name } = req.body;
        if (!Name) {
            return res.json({message: 'Name are required'});
        }
        const createCountry = await Country.create({ Name });
        res.status(201).json(createCountry);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const getAllCountry = async(req,res) => {
    try{
    const getAllCountry = await Country.find();
    return res.status(200).json(getAllCountry);    
} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const updateCountry = async(req,res) => {
    try{
    const updateCountry = await Country.findByIdAndUpdate();
    return res.status(200).json(updateCountry);    
} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const deleteCountry = async(req,res) => {
    try{
    const deleteCountry = await Country.findByIdAndDelete();
    return res.status(200).json(deleteCountry);    
} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
};

module.exports ={
    createCountry,
    getAllCountry,
    updateCountry,
    deleteCountry
};