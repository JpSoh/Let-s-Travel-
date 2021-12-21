let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create Schema
let userSchema = new Schema({
    email: String,
    password: String
})

//Convert to Class
let User = mongoose.model('User', userSchema, 'users');

module.exports = { User } //Javascript understands that Key and Value is Post. 