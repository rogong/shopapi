const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    const productSchema = new Schema({
    _id: ObjectId,
     name: { type: String, required: true},
     price: {type: Number, required: true},
     description: { type: String, required: true },
     color: { type: String, required: true },
     category: { type: String, required: true },
     productImage: {type: String, required: true }
     
});


module.exports = mongoose.model('Product', productSchema);