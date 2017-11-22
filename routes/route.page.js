var express = require("express");
var router = express.Router();
var PostModel = require('../models/post');
var config = require('../config');
var marked = require('marked');


/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

/* GET users listing. */
router.get("/users", function(req, res, next) {
  res.send("respond with a resource");
});

/* GET posts page. */
router.get("/posts", function(req, res, next) {
  res.render("posts");
});

/* GET category page. */
router.get("/posts/category", function(req, res, next) {
  let parmas = {};
  parmas.categoryId = req.query.id;
  parmas.type = req.query.type;
  res.render('categoryPage',{parmas});
});

/* GET create page. */
router.get('/posts/create',function (req,res,next) {
  let categoryId = req.query.categoryId;
  res.render('create',{categoryId});
});

/* GET show page. */
router.get('/posts/show',function (req,res,next) {
 
  var id = req.query.id;

  PostModel.findOne({_id:id},function (err,post) {
    
    post.mkContent = marked(post.content);

    res.render('show',{post});

  });
 
});

/* GET edit page. */
router.get('/posts/edit',function (req,res,next) {
  var id = req.query.id;
  res.render('edit',{id});
});

/* GET signup page. */
router.get('/signup',function (req,res,next) {
  res.render('signup');
});

/* GET signin page. */
router.get('/signin',function(req,res,next) {
  res.render('signin');
});


/* GET signout page. */
router.get('/signout',function(req,res,next) {
  res.clearCookie(config.cookieName,{path:'/'});
  res.redirect('/');
});



module.exports = router;
