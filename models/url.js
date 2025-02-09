const mongoose = require('mongoose');
/*
1) Create Schema
2) Create Model
*/
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [{timestamp: {type: String}, clientIp: {type: String}}],
}
,{timestamps: true}
);


const URL = mongoose.model("url", urlSchema);


module.exports = URL;