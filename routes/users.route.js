//Connect to path, to display image from files. 
let path = require('path');
//Import from post.model.js: The schema
let User = require('../models/user.model').User;
//Pre-requirement functions for express
let express = require('express');
//Redirect request from one file to another
let router = express.Router();
//Import module that encrypts password
let bcrypt = require('bcrypt');
//Import token functions
let auth = require('../controllers/auth');

//Sign In Tab
router.post('/login', async (req,resp)=>{
    let email = req.body.email;
    let password = req.body.password;
    //Find User based on email and password, returns an array
    let users = await User.find().where({email: email})
    //Find out whether users exist.
    if(users.length > 0){
        let comparisonResult = await  bcrypt.compare(password, users[0].password);
        if (comparisonResult){
            let token = auth.generateToken(users[0]);
            //Store Token on cookie storage
            resp.cookie('auth_token', token);
            resp.send({
                redirectURL: '/admin',
                message: 'Success'
            });
        } else{
            resp.send({message: 'Rejected!'});
        }
    } else{
        resp.send({message: 'Rejected!'});
    }
})
//Register Tab
router.post('/register', async (req,resp)=>{
    let email = req.body.email;
    let password = req.body.password;
    //Find whether a user has already registered
    let users = await User.find().where({email: email});
    //Find out whether users exist.
    if(users.length === 0){
        let encryptedPass = await bcrypt.hash(password,12);//Second value specify the encrpytion strength
        let newUser = new User({ email, 
            password: encryptedPass })
        await newUser.save();
        resp.send({message: 'Done!'});
    } else{
        resp.send({message: 'Rejected!'});
    }
})

module.exports = router;