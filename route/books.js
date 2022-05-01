var express = require('express')
var router = express.Router()
var book = require('../controllers/book_ctrl');
var middileware = require('../middileware')
// define the home page route
router.get('/', book.getBooks);
router.post('/addBookCategory', middileware.checkAuthentication, book.addBookCategory);
router.put('/editBookCategory', middileware.checkAuthentication, book.editBookCategory);
router.delete('/deleteBookCategory', middileware.checkAuthentication, book.deleteBookCategory);
router.get('/getAllCategory', book.getAllCategory);
router.get('/getAllTags', book.getAllTags);
router.post('/getBookBySlug',book.getBookBySlug);

router.get('/getBooksByUserId',middileware.checkAuthentication, book.getBooksByUserId);
router.get('/getLatestBooks', book.getLatestBooks);

router.post('/getBooksByCategory', book.getBooksByCategory);
router.post('/getBooksBytag', book.getBooksBytag);
router.post('/getBookByStoreId', book.getBookByStoreId);

router.post('/getBooksByFilter', book.getBooksByFilter);

//books router

router.post('/add', middileware.checkAuthentication, book.add);
router.put('/edit', middileware.checkAuthentication, book.edit);
router.delete('/delete', middileware.checkAuthentication, book.delete);
router.delete('/multidelete', middileware.checkAuthentication, book.multidelete);

router.post('/addBookComment', middileware.checkAuthentication,book.addBookComment);

module.exports = router