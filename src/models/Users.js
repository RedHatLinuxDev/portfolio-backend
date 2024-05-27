const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // Username is required and must be unique
    name: { type: String, required: true }, // Username is required and must be unique
    password: { type: String, required: true }, // Password is required
    userType :{type:String,required:true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
