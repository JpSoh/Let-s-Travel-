//Purpose is to let only authorised users access the data when typing route path names.
let auth = require('../controllers/auth');

function checkAuth(req, resp, next){
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        next();
    } else{
        resp.status(400); //Bad request
        resp.send("Not authorised")
    }
}

module.exports = checkAuth;