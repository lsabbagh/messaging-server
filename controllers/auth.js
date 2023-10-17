require('dotenv').config();
const { Response, Request } = require('express');
const Auth = require('../models/auth')
const User = require('../models/User');
const jwt = require('jsonwebtoken')



exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username
            , email,
            password
        });
        sendToken(user, 201, res)
    } catch (error) {
        next(error);
    }
};

// exports.login = async (req, res) => {
//     try {
//         const { username, password } =
//          req.body;
//         const user = await User.findOne({ username });
//         if (user == null || !user) {
//             return res.status(401).send({ match: false, message: 'Incorrect username or password' });
//         }
//         const match = await user.matchPassword(password)
//         if (!match) {
//             // console.log('stopped..pass');
//             return res.status(401).send({ match, message: 'Incorrect username or password' });
//         }

//         let token = createtoken(user._id);

//         //save data to DB
//         let auth = await Auth.findOne({ userId: user._id })
//         if (!auth) {
//             await Auth.create({ userId: user._id, token });
//         } else {
//             token = auth.token
//         }

//         auth = await Auth.findOne({ userId: user._id });
//         const loggedInAt = auth.created_at;

//         const _user = { ...user.toJSON() }
//         delete _user.password
//         console.log('....user', _user);

//         return res.send({ match, user: _user, token, loggedInAt })
//     } catch (error) {
//         res.status(400).json({ error: error.message })
//     }
// }

// exports.logout = async (req, res, next) => {
//     try {
//         const { userId } = req.params;
//         const {authType} = req.body
//         console.log('....auth//logout', userId, authType);
//         await Auth.deleteOne({ userId, authType });
//         res.status(200).send({message: 'Logout Successful'});
//     } catch (error) {
//         console.log('....error', error);
//         res.status(500).send({message: 'Internal Server Error'})
//     }
// }

// const { ErrorResponse } = require('../utils/errorResponse');
// exports.signIn = async (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return next(new ErrorResponse("Please provide a valid email and Password", 400))
//     };
//     try {
//         const user = await User.findOne({ email }).select("+password");
//         if (!user) {
//             return next(new ErrorResponse("Invalid Credentials", 401))
//         }
//         const isMatch = await user.matchPassword(password);
//         if (!isMatch) {
//             return next(new ErrorResponse("Invalid Credentials", 401))
//         }

//         sendToken(user, 200, res)
//     } catch (error) {
//         return next(new ErrorResponse(error.message, 500))
//     }
// }