//Connect to uniqid
let uniqid = require('uniqid'); 
//Import schema from callback-requests.model
let CallbackRequest = require('../models/callback-requests.model').CallbackRequest;
//Pre-requirement functions for express
let express = require('express');
//Redirect request from one file to another
let router = express.Router();
//Connect to auth middleware file
let authMiddleware = require('../middleware/auth');
//Get all requests, check token first before running callback
router.get('/', authMiddleware ,async (req, resp) =>{
    resp.send(await CallbackRequest.find());
});

//Adding new requests
router.post('/', async (req, resp) =>{
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save();
    resp.send("Accepted!");
});

//Deleting requests
router.delete('/:id', authMiddleware, async (req, resp) =>{
    await CallbackRequest.deleteOne({id: req.params.id})
    resp.send("Deleted!")
});

module.exports = router; 