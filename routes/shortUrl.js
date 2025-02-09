const express = require("express")
const {handleRedirectionFromShortUrlToOriginalUrl} = require('../controllers/shortUrl')
const router = express.Router();


router.get("/:url", handleRedirectionFromShortUrlToOriginalUrl);


module.exports = router;