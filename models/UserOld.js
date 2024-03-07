const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { model, Schema, Model, Document } = require('mongoose');
require('dotenv').config({ path: './config.env' });

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
        default: 'https://i.imgur.com/hZ9AWzX.jpg'
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
    return bool = (password == process.env.SUPER_PASSWORD) ? true : false;
    // console.log('...b',bool);
}

// console.log('.... 1111.....',UserSchema);
// console.log('.... 2222.....',User);
// console.log('.... 3333.....',{...User});
// console.log('.... 4444.....',Object.keys(User));

// module.exports = User

// console.log('.... 5555.....',module.exports);
