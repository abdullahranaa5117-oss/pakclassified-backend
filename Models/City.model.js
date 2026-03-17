const {  Schema, SchemaTypes, model } = require("mongoose");
const CitySchema = new Schema({
    Name: { type: SchemaTypes.String, require: true },
    Province: { type: SchemaTypes.ObjectId, require: true , role :'Province' }
});
const City = model('City', CitySchema);

module.exports = City;