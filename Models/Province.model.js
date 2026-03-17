const {  Schema, SchemaTypes, model } = require("mongoose");
const ProvinceSchema = new Schema({
    Name: { type: SchemaTypes.String, require: true},
    Country: { type: Schema.Types.ObjectId, ref: 'Country' }
});
const Province = model('Province', ProvinceSchema);

module.exports = Province;