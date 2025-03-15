const jwt = require("jsonwebtoken");

function JWTAuthenticator(req, res, next) {
    const token = req.cookies.token || req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }

    try{
        const decode = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(e){
        res.status(400).json({ error: "Invalid token" });
    }
}

module.exports = JWTAuthenticator;