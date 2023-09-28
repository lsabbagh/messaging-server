const { Response, Request } = require('express');
const {User} = require('../models/User'); 

exports.register= async(req,res,next)=>{
    const {username,email,password}=req.body;
    try {
        const user= await User.create({
            username
            ,email,
            password
        });
        sendToken(user,201,res)
    } catch (error) {
        next(error);
    }
};

const {ErrorResponse} = require('../utils/errorResponse');
exports.login = async(req,res,next)=>{
    const {email,password}=req.body;
    if (!email || !password){
        return next(new ErrorResponse("Please provide a valid email and Password",400))
    };
    try {
        const user  = await User.findOne({email}).select("+password");
        if (!user){
            return next(new ErrorResponse("Invalid Credentials",401))
        }
        const isMatch= await user.matchPassword(password);
        if (!isMatch){
            return next(new ErrorResponse("Invalid Credentials",401))
        }

        sendToken(user,200,res)
    } catch (error) {
        return next(new ErrorResponse(error.message,500))
    }
}