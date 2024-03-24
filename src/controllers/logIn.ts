import Auth from "../models/auth";
import User from "../models/User";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";

const createtoken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, {});
};

export const login = async (req, res) => {
    try {
        const authtype = "mbl";
        const { username, password } = req.body;
        const isDeleted = false;
        const user = await User.findOne({ username, isDeleted });

        if (!user) return res.status(401).send({ match: false, message: "Incorrect username or password" });

        const match = await user.matchPassword(password);
        if (!match) {
            return res.status(401).send({ match, message: "Incorrect username or password" });
        }

        let token = createtoken(user._id);

        //save data to DB
        let auth = await Auth.findOne({ userId: user._id, authtype });
        if (!auth) {
            auth = await Auth.create({ userId: user._id, token, authtype });
        }

        token = auth.token;
        // auth = await Auth.findOne({ userId: user._id, authtype });
        const loggedInAt = auth.created_at;

        const _user = { ...user.toJSON() };
        delete _user.password;

        return res.send({ match, user: _user, token, loggedInAt });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const adminLogIn = async (req, res, next) => {
    try {
        const authtype = "cms";
        const { username, password } = req.body;
        const type = "admin";
        const isDeleted = false;
        const admins = await User.find({ type, isDeleted });
        if (!admins.length && username === "superadmin" && password === process.env.SUPER_PASSWORD) {

            const userId = "573fgf9496zz7m7kkk7305f1";
            const token = createtoken(userId);
            const auth = await Auth.create({userId,  token, authtype });

            const loggedInAt = auth.created_at;

            return res.status(201).send({ token, loggedInAt });
        }
        const admin = await User.findOne({ username, type, isDeleted });
        if (admin == null || !admin) {
            return res
                .status(401)
                .send({ match: false, message: "Incorrect username or password" });
        }
        const match = await admin.matchPassword(password);
        if (!match) {
            return res
                .status(401)
                .send({ match, message: "Incorrect username or password" });
        }

        let token = createtoken(admin._id);

        //save token to DB
        let auth = await Auth.findOne({ userId: admin._id, authtype });
        if (!auth) {
            await Auth.create({ userId: admin._id, token, authtype });
        } else {
            token = auth.token;
        }

        auth = await Auth.findOne({ userId: admin._id, authtype });
        const loggedInAt = auth.created_at;

        const _admin = { ...admin.toJSON() };
        delete _admin.password;

        return res.status(201).send({ admin: _admin, token, loggedInAt });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const logout = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { authtype } = req.body;
        await Auth.deleteOne({ userId, authtype });
        res.status(200).send({ message: "Logout Successful" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

export const forgetpassword = async (req, res) => {
    const { username, email } = req.body;
    const user = await User.findOne({ username });

    if (user.email !== email) {
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

export const verifyToken = async (req, res, next) => {
    const { token, authtype, userid } = req.headers || {};
    const count = await Auth.count({ /*userId,*/ authtype, token });
    if (count == 1) {
        return next();
    }

    return res.status(401).send({ message: "token doesn't match" });
};
