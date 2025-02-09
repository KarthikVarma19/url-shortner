const URL = require('../models/url')

async function handleAnalytics(req, res){
    const shortUrl = req.params.url;
    const url = await URL.findOne({shortId: shortUrl});
    if(!url){
        return res.status(404).json({error: "incorrect url"});
    }
    const clicks = url.visitHistory.length;
    return res.status(200).json({clicks: clicks, anayltics: url.visitHistory});
}

module.exports = {
    handleAnalytics
}