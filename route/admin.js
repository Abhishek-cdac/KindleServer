var express = require('express')
var router = express.Router()
var admin = require('../controllers/admin_ctrl')
var store = require('../controllers/store_ctrl')
const middileware = require('../middileware')
// define the home page route
// router.get('/', admin.test);

router.post('/userRegistration', admin.userRegistration);
router.post('/userLogin', admin.userLogin);
router.post('/getUserByToken', admin.getUserByToken);
router.get('/getAllAuthor', admin.getAllAuthor);
router.get('/emailVerification/:token', admin.emailVerification);
router.post('/getUserById', admin.getUserById);
router.get('/getUserCount', admin.getUserCount);



router.post('/forgotPassword', admin.forgotPassword);
router.post('/resetPassword', admin.resetPassword);
router.post('/changePassword',middileware.checkAuthentication, admin.changePassword);
router.post('/addConsignee',middileware.checkAuthentication,admin.addConsignee);
router.get('/getAllConsignee',middileware.checkAuthentication,admin.getAllConsignee);
router.put('/updateProfile',middileware.checkAuthentication,admin.updateProfile);


router.post('/getAllUsers',middileware.checkAuthentication,admin.getAllUsers);



router.post('/addStore',middileware.checkAuthentication,store.addStore);
router.delete('/deleteStore',middileware.checkAuthentication,store.deleteStore);
router.post('/AprovedStore',middileware.checkAuthentication,store.AprovedStore);
router.delete('/deleteUser', admin.deleteUser);







module.exports = router;