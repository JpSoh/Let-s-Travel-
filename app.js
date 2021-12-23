//Pre-requirement functions for express
let express = require('express');
let app = express();
let mongoose = require('mongoose');
//Need to install multer to read binary data for image
let multer = require('multer');
//For reading cookies
let cookieParser = require('cookie-parser');
//Generate cookie for every requests
app.use(cookieParser());
//Connect to public file, tell express that public is the root folder for the client side
app.use(express.static('public'));
//Connect to auth file for checking token
let auth = require('./controllers/auth');
//Connect to Database
mongoose.connect('mongodb+srv://jp71:266746@projects.ejscg.mongodb.net/travels');
//Convert JSON format
app.use(express.json());
//Import Router
let postsRouter = require('./routes/posts.route');
let CallbackRequestsRouter = require('./routes/callback-requests.route');
let emailsRouter = require('./routes/emails.route');
let usersRouter = require('./routes/users.route');

//Import Post from post.model.js
let Post = require('./models/post.model').Post;
//Using ejs, first argument specifies the template engine, 
app.set('view engine', 'ejs');

//Configuration for image uploaded
let imageStorage = multer.diskStorage({
    //First Argument represent action if there is any error, second argument represent where the images have to be stored. 
    destination: (req, file, cb) => cb(null, 'public/images'), 
    filename: (req, file, cb) => cb(null, file.originalname)
})
//Convert binary data of image
app.use(multer({storage: imageStorage}).single('imageFile'));
//Redirect request to postsRouter
app.use('/posts', postsRouter);
//Redirect request to callback Router
app.use('/callback-requests', CallbackRequestsRouter);
//Redirect request to email router
app.use('/emails',emailsRouter);
//Redirect request to users router
app.use('/users',usersRouter);
//Generate a landmark html file when there is a get request when press on details button
app.get('/landmark', async (req,resp) => {
    //First argument is the name of the file nested in views folder, the name views is obligatory
    //Second argument is the object which has to be passed into the landmark ejs
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('landmark', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})

//Open admin page if there is a token and the token matches the server to see whether we logged in already
app.get('/admin', (req,resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.render('admin');
    } else{
        resp.redirect('/login');
    }
    
})

app.get('/login', (req,resp) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.redirect('/admin');
    } else{
        resp.render('login');
    }
})

app.listen(3000, ()=>{
    console.log("Listening 3000");
})

