const {  Schema, SchemaTypes, model } = require("mongoose");
const CityAreaSchema = new Schema({
    Name: { type: SchemaTypes.String, required: true}
});
const CityArea = model('CityArea', CityAreaSchema);

module.exports = CityArea;