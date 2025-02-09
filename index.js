const express = require('express');
const urlRoute = require('./routes/url')
const shortUrlRoute = require('./routes/shortUrl')
const analyticsRoute = require('./routes/analyticsRoute')
const {connectToMongoDb} = require('./connect')
const dotenv = require('dotenv');

const app = express();
const PORT = 8001;

dotenv.config();

const URI = process.env.URI;
connectToMongoDb(URI).then(()=>{
    console.log("MongoDB Connected");
});

//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/url", urlRoute);
app.use("/", shortUrlRoute);
app.use("/analytics", analyticsRoute)


app.listen(PORT, () => {
    console.log(`Server Started Running at ${PORT}`);
})