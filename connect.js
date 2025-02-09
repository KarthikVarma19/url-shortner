const mongoose = require('mongoose');

async function connectToMongoDb(uri){
    return mongoose.connect(uri);
}


module.exports = {connectToMongoDb};