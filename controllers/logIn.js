const express = require("express");
require("dotenv").config({ path: "./config.env" });
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Auth = require("../models/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const createtoken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {});
};

exports.login = async (req, res) => {
    try {
        const authType = "mbl";
        const { username, password } = req.body;
        const isDeleted = false;
        const user = await User.findOne({ username, isDeleted });
        if (!user) {
            return res
                .status(401)
                .send({ match: false, message: "Incorrect username or password" });
        }
        const match = await user.matchPassword(password);
        if (!match) {
            // console.log('stopped..pass');
            return res
                .status(401)
                .send({ match, message: "Incorrect username or password" });
        }

        let token = createtoken(user._id);

        //save data to DB
        let auth = await Auth.findOne({ userId: user._id, authType });
        if (!auth) {
            auth = await Auth.create({ userId: user._id, token, authType });
        } 

        token = auth.token;

        auth = await Auth.findOne({ userId: user._id, authType });
        const loggedInAt = auth.created_at;

        const _user = { ...user.toJSON() };
        delete _user.password;
        console.log("....login user", _user);

        return res.send({ match, user: _user, token, loggedInAt });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.adminLogIn = async (req, res, next) => {
    try {
        console.log("....adminLogIn..started");
        const authType = "cms";
        const { username, password } = req.body;
        const type = "admin";
        const isDeleted = false;
        const admins = await User.find({ type, isDeleted });
        console.log("....admins", admins);
        if (
            !admins.length &&
            username === "superadmin" &&
            password === process.env.SUPER_PASSWORD
        ) {
            console.log("....adminLogin..one.time");
            console.log("....one.time..initiated");
            const id = "573fgf9496zz7m7kkk7305f1";
            const token = createtoken(id);
            const auth = Auth.create({ userId: id, token, authType });

            const loggedInAt = auth.created_at;

            return res.status(201).send({ token, loggedInAt });
        }
        const admin = await User.findOne({ username, type, isDeleted });
        console.log("....admin", admin);
        if (admin == null || !admin) {
            console.log("stopped..admin");
            return res
                .status(401)
                .send({ match: false, message: "Incorrect username or password" });
        }
        const match = await admin.matchPassword(password);
        if (!match) {
            console.log("stopped..match");
            return res
                .status(401)
                .send({ match, message: "Incorrect username or password" });
        }

        let token = createtoken(admin._id);

        //save token to DB
        let auth = await Auth.findOne({ userId: admin._id, authType });
        console.log("....auth..1", auth);
        if (!auth) {
            await Auth.create({ userId: admin._id, token, authType });
            console.log("....auth..created");
        } else {
            token = auth.token;
        }

        auth = await Auth.findOne({ userId: admin._id, authType });
        console.log("....auth..2", auth);
        const loggedInAt = auth.created_at;

        const _admin = { ...admin.toJSON() };
        delete _admin.password;
        console.log("....login user", _admin);

        return res.status(201).send({ admin: _admin, token, loggedInAt });
    } catch (error) {
        console.log("....error", error);
        res.status(400).json({ error: error.message });
    }
};

exports.logout = async (req, res, next) => {
    console.log("....logout....logout...logout");
    try {
        const { userId } = req.params;
        const { authType } = req.body;
        console.log("....auth//logout", userId, authType);
        await Auth.deleteOne({ userId, authType });
        res.status(200).send({ message: "Logout Successful" });
    } catch (error) {
        console.log("....error", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
};

exports.forgetpassword = async (req, res) => {
    const { username, email } = req.body;
    const user = await User.findOne({ username });

    if (user.email !== email) {
        console.log(".... email", email);
        return res.status(406).json({ match: false });
    }

    const html = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset - Chatoo</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #333333;">Chatoo</h2>
                            <h4 style="color: #007bff;">Password Reset</h4>
                            <p style="color: #555555;">Dear ${username},</p>
                            <p style="color: #555555;">We have received a request to change the password for your account.</p>
                            <p style="font-weight: bold; font-size: 18px; color: #555555;">Send the below KEY to an admin:</p>
                            <div style="background-color: #007bff; color: #ffffff; padding: 10px; margin-top: 10px; border-radius: 4px; width: auto;">
                                <p style="margin: 0; font-weight: bold; font-size: 18px;">${user._id}</p>
                            </div>
                            <p style="font-weight: 500; color: #e44d26;">Do not share this key with anyone.</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;

    const transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASS,
        },
    });

    const mailOptions = {
        // from: "youremail@gmail.com",
        from: `"You" ${process.env.EMAIL_USER}`,
        to: email,
        subject: "Chatoo: Change Password",
        html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    res.status(202).json({ match: true });
};

exports.verifyToken = async (req, res, next) => {
    const { token, authtype, userid } = req.headers || {};
    console.log("....verifyToken process", { authtype, token });
    const count = await Auth.count({ /*userId,*/ authtype, token });
    if (count == 1) {
        console.log("....verifyToken accepted", count);
        return next();
    }

    console.log("....verifyToken rejected", count);
    return res.status(401).send({ message: "token doesn't match" });
};
