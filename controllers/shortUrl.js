const URL = require("../models/url");

//Check if the given url:id is valid or not
//Check if the given url is presnt in the mongo
async function handleRedirectionFromShortUrlToOriginalUrl(req, res) {
  const shortId = req.params.url;
  const updatedUrl = await URL.findOneAndUpdate(
    { shortId },
    { $push: {visitHistory: {
        timestamp: new Date().toLocaleString(),
        clientIp: req.ip,
    }} }
  );
  if(!updatedUrl){
    return res.status(404).json({"error": "incorrect url"});
  }
  res.redirect(updatedUrl.redirectURL);
}

module.exports = {
  handleRedirectionFromShortUrlToOriginalUrl,
};
