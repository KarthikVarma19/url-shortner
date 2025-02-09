const express = require('express');
const {handleAnalytics} = require('../controllers/analyticsRoute')
const router = express.Router();

router.get("/:url", handleAnalytics);


module.exports = router;