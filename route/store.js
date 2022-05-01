const express = require('express');
const middileware = require('../middileware')
const router = express.Router()
const store = require('../controllers/store_ctrl')

router.post('/addTransaction',middileware.checkAuthentication,store.addTransaction)
router.get('/',store.getAllStores)
router.post('/getTransactionDetails',middileware.checkAuthentication,store.getTransactionDetails)
router.post('/getAllTransactionBystoreId',middileware.checkAuthentication,store.getAllTransactionBystoreId)


module.exports =  router;