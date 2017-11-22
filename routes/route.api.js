var express = require("express");
var router = express.Router();
var CategoryModel = require("../models/category");
var PostModel = require("../models/post");
var errorHandle = require('../common/errorHandle');

/** 获取前10个数据 */
router.get("/top10", function (req, res, next) {
  let numbers = req.query.numbers || 10;

  PostModel.find({}, function (err, docs) {

    if (err) {
      errorHandle(err, next);
    } else {
      var docs = docs.reverse();
      if (docs.length > numbers) {
        docs = docs.slice(0, 10);
      }
      res.json({
        sucess: true,
        items: docs
      });
    }


  });
});

/** 获取分类*/
router.get("/posts/categories", function (req, res, next) {
  CategoryModel.find({}, function (err, categories) {

    if (err) {
      errorHandle(err, next);
    } else {
      res.json({
        sucess: true,
        categorylist: categories
      });
    }
  });
});

/** 获取单个分类的数据*/
router.get('/posts/category', function (req, res, next) {
  let id = ' ' + req.query.id + ' ';
  PostModel.find({ categoryId: id }, function (err, articleLists) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.json({
        sucess: true,
        postLists: articleLists.reverse()
      });
    }

  });
});

/** 发布文章*/
router.post('/posts', function (req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  var categoryId = req.body.categoryId;
  console.log(title, content, categoryId);
  var post = new PostModel();
  post.title = title;
  post.content = content;
  post.categoryId = categoryId;

  post.save(function (err, doc) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.json({
        sucess: true,
        post: doc
      });
    }
  });
});

/** 修改文章*/
router.patch('/posts/:id', function (req, res, next) {
  var id = req.params.id;
  var title = req.body.title;
  var content = req.body.content;

  PostModel.findOneAndUpdate({ _id: id }, { title, content }, function (err) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.json({});
    }
  });
});

/** 获取文章数据*/
router.get('/posts/:id', function (req, res, next) {
  var id = req.params.id;
  PostModel.findOne({ _id: id }, function (err, post, next) {
    if (err) {
      errorHandle(err, next);
    } else {
      res.json({ post });
    }
  });
});


module.exports = router;
