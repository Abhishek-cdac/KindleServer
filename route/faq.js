var express = require('express')
var router = express.Router()
var middileware = require('../middileware')
var faq = require('../controllers/faq_ctrl')

router.post('/add',faq.add)

router.put('/edit',middileware.checkAuthentication,faq.edit)

router.delete('/delete',middileware.checkAuthentication,faq.delete)

router.get('/',faq.getAllAprovedfaq)

router.get('/getAllFaq',middileware.checkAuthentication,faq.getAllFaq)

router.put('/faqAprovedStatus',middileware.checkAuthentication,faq.AprovedStatus)

module.exports = router