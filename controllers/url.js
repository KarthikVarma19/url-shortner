const {nanoid} = require("nanoid")
const URL = require('../models/url')
const validUrl = require('valid-url');
const dotenv = require('dotenv');


async function handleGenerateNewShortURL(req, res){

    if(!req.body.original_url){
        return res.status(404).json({error: "url is required"});
    }

    const originalURL = req.body.original_url;
    
    if(validUrl.isWebUri(originalURL)){
        const customUrl = req.body.custom_url;
        dotenv.config();
        let shortId = nanoid(Number(process.env.SHORT_URL_LENGTH));
        if(customUrl){
            shortId = customUrl;
        }
        const exists = await URL.findOne({shortId: shortId});
        if(exists){
            return res.json({id: exists.shortId, status: "already exists so redirected"});
        }
        await URL.create({
            shortId: shortId,
            redirectURL: originalURL,
            visitHistory: [],
        });
    
        return res.json({id: shortId});
    }
    return res.status(404).json({error: "url is incorrect"});
    
}


module.exports = {
    handleGenerateNewShortURL,
}