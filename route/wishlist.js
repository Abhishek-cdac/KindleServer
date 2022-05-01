const express = require('express');
const middileware = require('../middileware')
const router = express.Router()
const wishlist = require('../controllers/wishlist_ctrl')

router.post('/add',middileware.checkAuthentication,wishlist.add)
router.delete('/delete',middileware.checkAuthentication,wishlist.delete)
router.get('/getWishlist',middileware.checkAuthentication,wishlist.getWishlist)


module.exports = router;