require('dotenv').config({ path: './config.env' });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/error')
const { login, adminLogIn, logout, forgetpassword, verifyToken } = require("./controllers/logIn")
const Auth = require('./models/auth');

//connect to db
connectDB()
app.use(cors());

app.use(express.json());

app.use('/', (req, res, next) => {
    console.log('....params', {
        params: req.params,
        body: req.body,
        originalUrl: req.originalUrl,
        headers: req.headers,
        // send: res.send,
        // json: res.json,
        // status: res.status,
    });
    next()
    // res.json('Render.com health check passed.');

});
app.post('/api/login', login);
app.post('/api/admin/login', adminLogIn);
app.delete('/api/logout/:userId', logout);
app.post("/api/changePassword/user/forgetPassword", forgetpassword)

// app.use('/api/', verifyToken);

// app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/conversation", require("./routes/conversation"));
app.use("/api/message", require("./routes/message"));
app.use('/', (req, res, next) => {
    res.send({message: "hello"})
})

//ErrorHandler (Should be last piece of middleware)
// app.use(errorHandler);

const server = app.listen(
    PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    }
)
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`);
    server.close(() => process.exit(1))

})


//  
//  
// FEATURES:
// add animation: chatoo and the logo
// forget password: shuffle the id
// status (online, typing, offline) 
// last message should be displayed on chat list screen
// background selected by user image or default image or color
// line seperating chat list screen mafrod ykon shorter
// the profile should appear on the header of chat screen
// user should be able to change his email
// 
// 
// 
// make a web version
// 