const {Schema, SchemaTypes, model } = require("mongoose");

const AdvertisementCategorySchema = new Schema({
    Name: { type: SchemaTypes.String, required: true },
    Image: { type: SchemaTypes.String, required: true }
});
const AdvertisementCategory = model('AdvertisementCategory', AdvertisementCategorySchema);

module.exports=AdvertisementCategory;