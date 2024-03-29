// get access and verify the token
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
const authHeader = req.headers.authorization  
//  Bearer Token
if(!authHeader || !authHeader.startsWith('Bearer ')) {
   return res.status(401).json( {success: false, msg: "Authorization failed"})
}
// isolate the token
const token = authHeader.split(" ")[1];

try {
    const payload = jwt.verify(token, process.env.jwt_secret);
    req.user = { userId: payload.userId, name: payload.name};
    next()
    
} catch (error) {
   res.status(401).json( {success: false, msg: "Authorization failed"})
    
}
}

module.exports = auth;