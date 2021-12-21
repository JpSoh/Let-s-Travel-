let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Create Schema
let postSchema = new Schema({
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String,
    country: String,
    imageURL: String
})

//Convert to Class
let Post = mongoose.model('Post', postSchema);

module.exports = { Post } //Javascript understands that Key and Value is Post. 