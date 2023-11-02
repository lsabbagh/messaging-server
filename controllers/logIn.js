const express = require("express");
require('dotenv').config();
const Auth = require('../models/auth')
const User = require('../models/User');
const jwt = require('jsonwebtoken')



const createtoken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}

exports.login = async (req, res) => {
    try {
        const authType = 'mbl';
        const { username, password } =
            req.body;
        const isDeleted = false;
        const user = await User.findOne({ username, isDeleted });
        if (user == null || !user) {
            return res.status(401).send({ match: false, message: 'Incorrect username or password' });
        }
        const match = await user.matchPassword(password)
        if (!match) {
            // console.log('stopped..pass');
            return res.status(401).send({ match, message: 'Incorrect username or password' });
        }

        let token = createtoken(user._id);

        //save data to DB
        let auth = await Auth.findOne({ userId: user._id, authType })
        if (!auth) {
            await Auth.create({ userId: user._id, token, authType });
        } else {
            token = auth.token
        }

        auth = await Auth.findOne({ userId: user._id, authType });
        const loggedInAt = auth.created_at;

        const _user = { ...user.toJSON() }
        delete _user.password
        console.log('....login user', _user);

        return res.send({ match, user: _user, token, loggedInAt })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.adminLogIn = async (req, res, next) => {
    try {
        console.log('....adminLogIn..started');
        const authType = 'cms';
        const { username, password } = req.body;
        const type = "admin";
        const isDeleted = false;
        const admins = await User.find({ type, isDeleted })
        console.log('....admins', admins);
        if (admins.length == 0) {
            if (username === 'superadmin') {
                if (password === superpassword) {
                    const id = '573fgf9496zz7m7kkk7305f1';
                    const token = createtoken(id);
                    Auth.create({ authType, userId: id, token })

                    const loggedInAt = auth.created_at;
                    return res.status(201).send({ token, loggedInAt })
                }
            }
        }
        const admin = await User.findOne({ username, type, isDeleted });
        console.log('....admin', admin);
        if (admin == null || !admin) {
            console.log('stopped..admin');
            return res.status(401).send({ match: false, message: 'Incorrect username or password' });
        }
        const match = await admin.matchPassword(password);
        if (!match) {
            console.log('stopped..match');
            return res.status(401).send({ match, message: 'Incorrect username or password' });
        }

        let token = createtoken(admin._id);

        //save token to DB
        let auth = await Auth.findOne({ userId: admin._id, authType })
        console.log('....auth..1', auth);
        if (!auth) {
            await Auth.create({ userId: admin._id, token, authType });
            console.log('....auth..created',);
        } else {
            token = auth.token;
        }

        auth = await Auth.findOne({ userId: admin._id, authType });
        console.log('....auth..2', auth);
        const loggedInAt = auth.created_at;

        const _admin = { ...admin.toJSON() }
        delete _admin.password
        console.log('....login user', _admin);

        return res.status(201).send({ admin: _admin, token, loggedInAt })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.logout = async (req, res, next) => {
    console.log('....logout....logout...logout',);
    try {
        const { userId } = req.params;
        const { authType } = req.body
        console.log('....auth//logout', userId, authType);
        await Auth.deleteOne({ userId, authType });
        res.status(200).send({ message: 'Logout Successful' });
    } catch (error) {
        console.log('....error', error);
        res.status(500).send({ message: 'Internal Server Error' })
    }
}

exports.verifyToken = async (req, res, next) => {
    const { token, authtype, userid } = req.headers || {};
    console.log('....verifyToken process', { authtype, token });
    const count = await Auth.count({ /*userId,*/ authtype, token });
    if (count == 1) {
        console.log('....verifyToken accepted', count);
        return next()
    }

    console.log('....verifyToken rejected', count);
    return res.status(401).send({ message: "token doesn't match" })
}
