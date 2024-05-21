const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{  
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.json({message: 'token not found'});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decoded);
        if(decoded){
            req.body.userId = decoded.userId;
            console.log(req.body.userId);
            next();
        }
        else{
            return res.json({message: 'token is valid'});
        }
    }
    catch(err){
        return res.json({message: 'token not found. No token'});
    }
}