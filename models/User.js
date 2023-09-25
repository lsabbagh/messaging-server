const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const{ model, Schema, Model, Document } = require('mongoose');

// define user schema
const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Can't be blank"],
        index: true
    },
    password: {
        type: String,
        required: true,
        select: true,
        minlength:  [8, "Please use minimum of 8 characters"],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
        unique:true,
        index:true
    },
    active: { type: Boolean, default: true }
});

// UserSchema.pre("save", async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     const salt = await bycrypt.genSalt(10);
//     this.password = bycrypt.hashSync(this.password, 10);
//     next();
// });

UserSchema.methods.matchPassword = async function (password) {
    return await bycrypt.compare(password, this.password)   
}
// UserSchema.methods.getSignedToken= function (password) {
//     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRE
//     })   
// }


const User = model("User", UserSchema);
 module.exports = User