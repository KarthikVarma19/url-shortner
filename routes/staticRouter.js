const express = require('express');
const URL = require('../models/url')

const router = express.Router();

router.get("/", async (req, res) => {
    //redirect the user to login
    // if(!req.user){
    //     return res.redirect("/login");
    // }
    if(!req.user){
        return res.render("home");
    }
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render("home", {
        urls: allUrls
    });
})

router.get("/signup", (req, res) => {
    res.render("signup");
});


router.get("/login", (req, res) => {
    res.render("login");
});

module.exports = router;