const express = require('express');
const middileware = require('../middileware')
const router = express.Router()
const blog = require('../controllers/blog_ctrl')
// define the home page route
router.get('/', blog.getAllBlogs);
router.post('/getBlogBySlug', blog.getBlogBySlug);
router.post('/getAllBlogsByMonth', blog.getAllBlogsByMonth);
router.post('/getBlogsByUser', middileware.checkAuthentication, blog.getBlogsByUser);


router.post('/add', middileware.checkAuthentication, blog.add);
router.put('/edit', middileware.checkAuthentication,middileware.checkBlogDeleteAuthentication, blog.edit);
router.delete('/delete', middileware.checkAuthentication, middileware.checkBlogDeleteAuthentication, blog.delete);
router.delete('/multidelete ', middileware.checkAuthentication, blog.multidelete );


router.post('/getBlogsByCategoryname', blog.getBlogsByCategoryname);
router.post('/getBlogsByCategoryId', blog.getBlogsByCategoryId);
router.get('/getAllBlogsCategory', blog.getAllBlogsCategory);
router.post('/addBlogCategory', middileware.checkAuthentication, blog.addBlogCategory);
router.put('/editBlogCategory', middileware.checkAuthentication, blog.editBlogCategory);
router.delete('/deleteBlogCategory', middileware.checkAuthentication, blog.deleteBlogCategory);

router.post('/addBlogComment', blog.addBlogComment);


router.post(
  "/approvedBlogs",
  middileware.checkAuthentication,
  blog.approvedBlogs
);
router.get("/getAllApprovedBlogs", blog.getAllApprovedBlogs);


module.exports = router