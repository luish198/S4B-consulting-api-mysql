const express = require('express');
const {SentQuoteEmail} = require('../controllers/emailServer.js')

const router = express.Router();

router.post('/', SentQuoteEmail);


module.exports = router