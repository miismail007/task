const jwt = require('jsonwebtoken')
require('dotenv').config()
const Users = require("./models/Users");


module.exports = async (req,res,next) => {
    if(req.headers.authorization === undefined){
        return res.json({
            Httpcode:201,
            Message : "No token, Authorization Denied",
        });
    }else{
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
            const user = await Users.findById(decoded._id)
            if(user != null){
                req.body = {...req.body , decoded}
                next();
            }else{
                res.json({
                    Httpcode:201,
                    Message : "Token Not Valid",
                })
            }
            
        } catch (error) {
            res.json({
                Httpcode:201,
                Message : "Token not valid"
            })
        }
    }

}