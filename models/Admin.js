const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const{ model, Schema, Model, Document } = require('mongoose');

// define admin schema
const AdminSchema = new Schema({
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

AdminSchema.methods.matchPassword = async function (password) {
    return await bycrypt.compare(password, this.password)   
}


const Admin = model("Admin", AdminSchema);
 module.exports = Admin