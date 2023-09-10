
const User = require('../models/User'); 

exports.list= async(req,res,next)=>{

    const users = await User.find({})
    
    res.send(users)
};

exports.create = async(req, res, next) => {
    const user = {
        username: 'testing' + (new Date()),
        email: Math.random() + 'testing@gmail.com' ,
        password: '23dasfas42234r2'
    }

    return User.create(user)
}