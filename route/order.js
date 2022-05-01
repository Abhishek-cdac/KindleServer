const express = require('express');
const middileware = require('../middileware')
const router = express.Router()
const order = require('../controllers/order_ctrl')

router.post('/createorder',order.createOrder)
router.put('/updateorder',order.updateOrder)
router.post('/getallorders',middileware.checkAuthentication,order.getAllOrders)
router.get('/getOrderByUserId',middileware.checkAuthentication,order.getOrderByUserId)
router.post('/getOrderByStoreId',middileware.checkAuthentication,order.getOrderByStoreId)
router.get('/getOrderDetailsById/:Id',middileware.checkAuthentication,order.getOrderDetailsById)
router.post('/getOrderByAuthorId',middileware.checkAuthentication,order.getOrderByAuthorId)


module.exports =  router;