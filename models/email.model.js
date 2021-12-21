let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let emailSchema = new Schema({
    id: String,
    email: String,
    name: String,
    text: String, 
    date: Date
});

//Third argument is the collection name
let Email = mongoose.model('Email', emailSchema, 'emails');

module.exports = { Email };