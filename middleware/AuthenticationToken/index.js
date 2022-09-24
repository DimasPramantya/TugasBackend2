const jwt = require('jsonwebtoken')
const accessTokenSecretKey = "itc-secret-key";

function AuthenticationToken(req,res,next){
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        next(new Error("token not found!!"))
    }
    const token = authHeader.split(" ")[1]
    if(!token){
        throw new Error("token is required");
    }
    const decoded = jwt.verify(token,accessTokenSecretKey);
    const user = {
        id: decoded.id,
        fullName: decoded.fullName,
        jabatan: decoded.jabatan,
        email: decoded.email,
    }
    req.user = user;
    next();
}

module.exports = AuthenticationToken;