const User = require('../Models/User.model');
require("dotenv").config();
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generate");
const { sendOTP } = require('./Otp.controller');

// SIGNUP
const signup = async (req, res) => {
  console.log("Request Body:", req.body);
   console.log("Uploaded File:", req.file);
  try {
    let { Name , ApiKey, BirthDate , ContactNumber ,LoginId, Email , Password , SecurityAnswer , SecurityQuestion  } = req.body;
    if (!Name ||!ApiKey||!BirthDate ||!ContactNumber ||!LoginId ||!Email  ||!Password  ||!SecurityAnswer ||!SecurityQuestion ) {
      return res.status(400).json({ message: "All fields are required" });
    } 
    if (!req.file) {
      return res.status(400).json({ message: 'Image upload failed' })
    }
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const imagepath = req.file ? `/uploads/${req.file.filename}` : '';

    const hashedPassword = await bcrypt.hash(Password, 10);

    const createUser = await User.create({
     Name , Email, Password: hashedPassword, Image: imagepath, ApiKey, BirthDate , ContactNumber ,LoginId, SecurityAnswer ,
      SecurityQuestion ,OTP: otp , OTPExpire : Date.now()+10*60*1000 
    });
    
    await sendOTP(Email , otp)
    
    res.status(201).json({
      message: "OTP sent to email",
      email: Email
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const verifyOTP = async (req, res) => {
    try {
        const { Email, OTP } = req.body;
        const user = await User.findOne({ Email });
        if (!user) return res.status(404).json({ message: "user not found" });

        if (user.OTP != OTP) return res.status(400).json({ message: "Invalid OTP" })
        if (user.OTPExpire < Date.now()) return res.status(400).json({ meessage: "OTP Expired" })
      
          user.isVerified = true;
        user.OTP = null;
        user.OTPExpire = null;
      
        await user.save()
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to verify OTP" });
    }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ Email });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify OTP first" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });


    return res.status(200).json({
      user: {
        _id: user._id,
        Name: user.Name,
        Email: user.Email,
        ContactNumber: user.ContactNumber,
        Image: user.Image,
       ApiKey:user.ApiKey,
        BirthDate :user.BirthDate ,
        LoginId:user.LoginId,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const GetAllUser = async (req, res) => {
  try {
    const GetAllUser = await User.find();
    return res.status(200).json(GetAllUser);
  } catch (err) { 
    return res.status(500).json({ error: err.message });
  }
};

const GetByIdUser = async (req, res) => {
  try {
    const id = req.params.id;
    const found = await User.findById(id);
    if (!found) return res.status(404).json({ message: `User with id ${id} not found` });
    return res.status(200).json(found);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const userId = req.user.id; 

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(updatedUser);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: `User with id ${id} not found` });
    return res.status(200).json(deleted);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signup,
  verifyOTP,
  login,
  GetAllUser,
  GetByIdUser,
  UpdateUser,
  DeleteUser,
};








































// require("dotenv").config();

// const jwt=require("jsonwebtoken");
// const User = require('../Models/User.model');
// const bcrypt = require('bcryptjs');   //bcrypt add

// class UserController {
//     constructor() {
//     }


//     async GetAll(req, res) {
//         try {
//             const user = await User.find().populate("Role");
//             return res.status(200).json(user);
//         }
//         catch (err) {
//             return res.status(500).json(new Message(`${err.message}`, 500));
//         }
//     }

//     async GetById(req, res) {
//         try {
//             const id = req.params.id;
//             const found = await User.findById(id).populate("Role");
//             if (!found) return res.status(404).json(new Message(`user against given id#${id} is not found`, 404));
//             return res.status(200).json(found);
//         }
//         catch (err) {
//             console.log(err);
//             return res.status(500).json(new Message(`${err.message}`, 500));
//         }
//     }

//     async Create(req, res) {
//         try {
//             const obj = req.body;
//             //server side data validation
//             if (!obj.Email || !obj.Password || !obj.FullName) return res.status(400).json(new Message("invalid json data, email,password and fullName are required field"));
//             if (!obj.Role) {
//                 const guestRole = await Role.findOne({ Name: process.env.APP_GUEST_ROLE });
//                 obj.Role = guestRole;                
//             }
//             // obj.Password
//             console.log(obj.Password);
           
//             const hashPassword=await bcrypt.hash(obj.Password,10);
           
//             console.log(hashPassword);

//             obj.Password=hashPassword;
           
//             const created = await User.create(obj);
           
//             res.header("location", `${req.originalUrl}/${created._id}`);
           
//             return res.status(201).json(created);
//         }
//         catch (err) {
//             console.error(err);
//             return res.status(500).json(new Message(`${err.message}`, 500));
//         }
//     }

//     async Update(req, res) {
//         try {
//             const id = req.params.id;
//             //data validation check here, if needed
//             const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
//             if (!updated) return res.status(404).json(new Message(`user against given id#${id} is not found`, 404));
//             return res.status(200).json(updated);
//         }
//         catch (err) {
//             return res.status(500).json(new Message(`${err.message}`, 500));
//         }
//     }

//     async Delete(req, res) {
//         try {
//             const id = req.params.id;
//             const deleted = await User.findByIdAndDelete(id);
//             if (!deleted) return res.status(404).json(new Message(`user against given id#${id} is not found`, 404));
//             return res.status(200).json(deleted);
//         }
//         catch (err) {
//             return res.status(500).json(new Message(`${err.message}`, 500));
//         }
//     }  

//        async Login(req, res) {
//         try {
//             const currentUser = await User.findOne({ Email: req.body.Email }).populate("Role");
//             if (currentUser) {
//                 //compare password from user with encrypted password in database
//                 if (await bcrypt.compare(req.body.Password, currentUser.Password)) {



//                     const key =process.env.JWT_SECRET_KEY;
//                     const payLoad = { 
//                         _id: currentUser._id, 
//                         Email:currentUser.Email, 
//                         FullName: currentUser.FullName, 
//                         Role: {
//                             Name: currentUser.Role.Name, 
//                             Rank: currentUser.Role.Rank
//                         } 
//                     };                    
//                     const options={ 
//                             expiresIn: Number(process.env.JWT_TOKEN_EXPIRES_IN) // time in seconds
//                     }
//                     const token = await jwt.sign(
//                         payLoad,//data as payload
//                         key, //secret key for encryption
//                         options //options  
//                     );
//                     console.log(token);
//                     res.header(
//                         process.env.JWT_TOKEN_HEADER, //header name
//                         token // header value
//                     );
//                     return res.status(200).json( { token: token, user: currentUser });
//                    //return res.status(200).json(currentUser);
//                 }
//             }
//             return res.status(404).json(new Message(`invalid email or password`,404));
//         } catch (error) {
//             console.error(error);
//             return res.status(500).json(new Message("failed to get user",500));
//         }
//     }



// }

// module.exports = new UserController();



