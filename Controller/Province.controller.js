const Province = require('../Models/Province.model');
const createProvince = async (req, res) => {
    try {
        let { Name } = req.body;
        if (!Name) {
            return res.json({message: 'Name are required'});
        }
        const createProvince = await Province.create({ Name });
        res.status(201).json(createProvince);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const getAllProvince = async(req,res) => {
    try{
    const getAllProvince = await Province.find();
    return res.status(200).json(getAllProvince);    
} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const updateProvince = async(req,res) => {
    try{
    const updateProvince = await Province.findByIdAndUpdate();
    return res.status(200).json(updateProvince);    
} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
}
const deleteProvince = async(req,res) => {
    try{
    const deleteProvince = await Province.findByIdAndDelete();
    return res.status(200).json(deleteProvince);    
} catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
};

module.exports ={
    createProvince,
    getAllProvince,
    updateProvince,
    deleteProvince
};