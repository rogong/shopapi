const mongoose = require('mongoose');

const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    const userSchema = new Schema({
    _id: ObjectId,
     email:  {
     	type: String, 
     	required: true, 
     	unique: true,
     	match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


     },
     password: { type: String, required: true}
     
});


module.exports = mongoose.model('User', userSchema);