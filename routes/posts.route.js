//Connect to uniqid
let uniqid = require('uniqid'); 
//Connect to path, to display image from files. 
let path = require('path');
//Import from post.model.js: The schema
let Post = require('../models/post.model').Post;
//Pre-requirement functions for express
let express = require('express');
//Redirect request from one file to another
let router = express.Router();
//Connect to auth middleware file
let authMiddleware = require('../middleware/auth');
//We do not need to specify the beginning /posts route path as it is specified in app.js
//Get all data/posts from database
router.get('/', async (req, resp) =>{
    let posts = await Post.find();
    resp.send(posts);
})
//Update function: Get current title and current text from the database by ID
router.get('/:id', async (req, resp) =>{
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
})

//Post request from create-post.js
router.post('/', authMiddleware, async (req, resp) =>{
    let reqBody = req.body;
    let imgPath;
    //if image URL is not empty
    if(req.body.imageUrl){
        imgPath = reqBody.imageUrl;
    } else{
        imgPath = req.file.path.substring(req.file.path.indexOf(path.sep), req.file.path.length);
    }
    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    });
    await newPost.save();
    resp.send('Created!');

})

//Delete Request
router.delete('/:id', authMiddleware, async (req,resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send("Deleted!");
})

//Update request
router.put('/:id', authMiddleware, async (req,resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('Updated!');
})
//Connect router to app.js file
module.exports = router