const jwt = require('jsonwebtoken');
require("dotenv").config();


const generateToken = (id) => {
    return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",  
    });
    
};

module.exports = generateToken;
