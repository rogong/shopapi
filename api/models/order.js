const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    const orderSchema = new Schema({
    _id: ObjectId,
     product:  {type: ObjectId, ref: 'Product', required: true},
     quantity: { type: Number, default: 1}
     
});


module.exports = mongoose.model('Order', orderSchema);