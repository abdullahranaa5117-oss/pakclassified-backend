const { Schema, SchemaTypes, model } = require("mongoose");

const AdvertisementSchema = new Schema({
    Name: { type: SchemaTypes.String, required: true },
    Description: { type: SchemaTypes.String, required: true },
    Price: { type: SchemaTypes.Number, required: true },
    Images: { type: SchemaTypes.String },
    Category: { type: SchemaTypes.ObjectId, ref: "AdvertisementCategory", required: true },
    CityArea: { type: SchemaTypes.ObjectId, ref: "CityArea", required: true },
    PostedBy: { type: SchemaTypes.ObjectId, ref: 'User' },
    StartsOn: { type: SchemaTypes.Date, required: true },
    EndsOn: { type: SchemaTypes.Date, required: true },
},{ timestamps: true });
const Advertisement = model('Advertisement', AdvertisementSchema);
module.exports = Advertisement;