var express = require("express");
var router = express.Router();
var PostModel = require('../models/post');
var marked = require('marked');

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET users listing. */
router.get("/users", function(req, res, next) {
  res.send("respond with a resource");
});

/* GET posts page. */
router.get("/posts", function(req, res, next) {
  res.render("posts", { title: "Express" });
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
  console.log(categoryId,"类别id");
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


module.exports = router;
