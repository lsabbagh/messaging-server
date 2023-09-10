const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const{ model, Schema, Model, Document } = require('mongoose');


//generate point schema
const Point = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

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
        select: false,
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
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
        bio: String,
        phone: String,
        gender: String,
        address: {
            street1: String,
            street2: String,
            city: String,
            state: String,
            country: String,
            zip: String,
            location: {
                type: Point,
                required: false
            }
        },
        required:false
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

// UserSchema.methods.matchPassword= async function (password) {
//     return await bycrypt.compare(password,this.password)   
// }
// UserSchema.methods.getSignedToken= function (password) {
//     return jwt.sign({id:this._id},process.env.JWT_SECRET,{
//         expiresIn:process.env.JWT_EXPIRE
//     })   
// }


const User = model("User", UserSchema);
 module.exports = User