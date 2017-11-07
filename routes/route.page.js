var express = require("express");
var router = express.Router();
var PostModel = require('../models/post');

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

/* GET edit page. */
router.get('/posts/create',function (req,res,next) {
  let categoryId = req.query.categoryId;
  console.log(categoryId,"类别id");
  res.render('create',{categoryId});
});



module.exports = router;
