const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res,next) =>{


    const auth_header  = req.headers.authorization;
    
    if(!auth_header){
        return res.status(401).json({error:"Token required"});
    }
    
    const token = auth_header.split(" ")[1];

    try {
        const decoded = jwt.verify(token,"keyUser");
        req.user = decoded;
        next();


    } catch (error) {
        

        return res.status(403).json({error:"Invalid token"});

    }






}
