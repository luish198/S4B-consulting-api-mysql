const express = require('express');
const {getClients, 
       getCompanyMarket, 
       createNewClient,
       getCompanyType,
       createNewQuote,
       getOneClientById,
       getOneQuoteById,
       getMaxQuoteRef,

       } = require('../controllers/clients.js');

const router = express.Router();

router.get('/', getClients)
//router.get('/:client_id',getOneClientById) // Be careful when activating this option need to change routes depending on client/ 

router.get('/company-market', getCompanyMarket)
router.get('/company-type', getCompanyType)

router.get('/quotes/:quote_id', getOneQuoteById )
router.get('/quotesmaxref', getMaxQuoteRef )



router.post('/newclient', createNewClient)

router.post('/newquote', createNewQuote)





module.exports = router