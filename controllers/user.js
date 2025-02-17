const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const {setUser} = require('../service/auth');
async function handleUserSignUp(req, res){
    const {name, email, password} = req.body;
    try{
        await User.create({
            name, email, password,
        });
        return res.redirect("/");
    }catch(err){
        return res.json({error: err});
    }
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email, password});
        if(!user){
            return res.render("login", {
                error: "Invalid Email Or Password"
            });
        }
        //const sessionId = uuidv4();
        const token = setUser(user);
        res.cookie("uid", token);
        return res.redirect("/");
    }catch(err){
        return res.json({error: err});
    }
}

module.exports = {handleUserSignUp, handleUserLogin}