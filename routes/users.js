const express = require('express');
const router = express.Router();
const md5 = require('md5')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const auth = require('../auth');
const Users = require('../models/Users');



router.post('/create_user',async (req,res)=>{
    try {
        const user = new Users({
            user_name : req.body.user_name,
            user_email : req.body.user_email,
            user_password : md5(req.body.user_password),
            user_mobile : req.body.user_mobile,
        });
        const usermobilecheck = await Users.find({
            user_mobile : req.body.user_mobile
        });
        const useremailcheck = await Users.find({
            user_email : req.body.user_email
        });
        if( usermobilecheck.length === 0 && useremailcheck.length === 0 ){
            user.save();
            res.json({
                Httpcode : 200,
                Message : "User Added Successfully"
            })
        }else{
            res.json({
                Httpcode : 201,
                Message : "Email or Mobile number already exist"
            })
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            Httpcode : 201,
            Message : error.message
        })
        
    }

});

router.post('/login',async (req,res)=>{
    try {
        await Users.find({user_email : req.body.user_email},(err,user)=>{
            if (err === null) {
                if(user.length === 1) {
                    if(user[0].user_password === md5(req.body.user_password)){
                        let payload = {
                            _id : user[0]._id,
                            user_email : user[0].user_email,
                            user_name : user[0].user_name
                        }
                        jwt.sign(
                            payload,process.env.ACCESS_TOKEN_SECRET,
                            req.body.remember_me ? {expiresIn:'5h'} : {expiresIn : '10m'},
                            (err,token)=>{
                                res.json({
                                    Httpcode : 201,
                                    Message : "Login Successful",
                                    Response: token
                                })
                            }
                        )
                    }else{
                        res.json({
                            Httpcode : 201,
                            Message : "Password incorrect"
                        })
                    }
                }else{
                    res.json({
                        Httpcode : 201,
                        Message : "Email does not exist"
                    })
                }
            } else {
                console.log(err);
            }
        });
        
    } catch (error) {
        console.log(error.message);
        res.json({
            Httpcode : 201,
            Message : error.message
        })
    }

});

router.get("/all_users",auth ,async(req,res)=>{
    try {
        await Users.find({},(err,result)=>{
            if(err === null){
                res.json({
                    Httpcode : 201,
                    Message : result
                })
            }else{
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            Httpcode : 201,
            Message : error.message
        })
    }
})


module.exports = router