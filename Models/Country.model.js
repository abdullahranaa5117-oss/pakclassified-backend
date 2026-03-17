const {  Schema, SchemaTypes, model } = require("mongoose");
const CountrySchema = new Schema({
    Name: { type: SchemaTypes.String, require: true}
});
const Country = model('Country', CountrySchema);

module.exports = Country;