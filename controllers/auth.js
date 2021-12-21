let jwt = require('jsonwebtoken');
let secret = '2y#cw@nT*pVt';

//Generate Key
function generateToken(user){
    let payload = {
        email: user.email,
        password: user.password
    }
    return jwt.sign(payload, secret);
}
//Check that key provided by user is correct
function checkToken(token){
    try{
        let result = jwt.verify(token, secret);
        return result;
    } catch(error){
        return false;
    }
}

module.exports = { generateToken, checkToken };