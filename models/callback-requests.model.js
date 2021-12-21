let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let callbackRequestsSchema = new Schema({
    id: String,
    phoneNumber: String,
    date: Date
});

//Third argument is the collection name
let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestsSchema, 'callback-requests');

module.exports = { CallbackRequest };