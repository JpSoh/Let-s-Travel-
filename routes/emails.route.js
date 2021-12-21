//Connect to uniqid
let uniqid = require('uniqid'); 
//Import schema from email model
let Email = require('../models/email.model').Email;
//Pre-requirement functions for express
let express = require('express');
//Redirect request from one file to another
let router = express.Router();
//Connect to auth middleware file
let authMiddleware = require('../middleware/auth');
//Get all requests
router.get('/', authMiddleware , async (req, resp) =>{
    resp.send(await Email.find());
});

//Adding new requests
router.post('/', async (req, resp) =>{
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        email: reqBody.email,
        name: reqBody.name,
        text: reqBody.text,
        date: new Date()
    })
    await newEmail.save();
    resp.send("Accepted!");
});

//Deleting requests
router.delete('/:id', authMiddleware, async (req, resp) =>{
    await Email.deleteOne({id: req.params.id})
    resp.send("Deleted!")
});

module.exports = router; 