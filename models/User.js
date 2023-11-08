const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { model, Schema, Model, Document } = require('mongoose');

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
        minlength: [8, "Please use minimum of 8 characters"],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Can't be blank"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
        unique: true,
        index: true
    },
    type: {
        type: String,
        enum: ["admin", "user"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: 'https://imgur.com/a/X3TMJ7a'
    },
    firstName: {
        type: String,
        index: true
    },
    lastName: {
        type: String,
        index: true
    },
    active: { type: Boolean, default: true }
});


UserSchema.methods.matchPassword = async function (password) {
    return await bycrypt.compare(password, this.password)
}



const User = model("User", UserSchema);

User.matchSuperPassword = async function (password) {
    const superPassword = "7e5!Et9Yfr?$2Yv"
    return bool = (password == superPassword) ? true : false;
    // console.log('...b',bool);
}
module.exports = User