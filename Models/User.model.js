const { Schema, SchemaTypes, model } = require("mongoose");
const UserSchema = new Schema({
    Name: { type: SchemaTypes.String, required: true },
    ApiKey: { type: SchemaTypes.String, required: true },
    BirthDate: { type: SchemaTypes.String, required: true },
    ContactNumber: { type: SchemaTypes.String, required: true },
    Email: { type: SchemaTypes.String, required: true },
    Image: { type: SchemaTypes.String, required: true },
    LoginId: { type: SchemaTypes.String, required: true },
    Password: { type: SchemaTypes.String, required: true },
    SecurityAnswer: { type: SchemaTypes.String, required: true },
    SecurityQuestion: { type: SchemaTypes.String, required: true },
    
    isVerified: { type: Boolean, default: false },
    OTP: { type:String },
    OTPExpire: { type: Date },
    
}, { timestamps: true });

const User = model('User', UserSchema);
module.exports = User; 