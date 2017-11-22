var express = require("express");
var router = express.Router();
var CategoryModel = require("../models/category");
var PostModel = require("../models/post");
var errorHandle = require('../common/errorHandle');
var bcrypt = require('bcrypt');
var UserModel = require('../models/user');
var config = require('../config');

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


/*POST signup user */
router.post('/signup',function (req,res,next) {
    var name = req.body.name;
    var pass = req.body.pass;
    var rePass = req.body.rePass;

    if (pass !== rePass) {
      return errorHandle(new Error('两次密码不对'),next);
    }

    var user = UserModel();
    user.name = name;
    user.pass = bcrypt.hashSync(pass,10);
    user.save(function (err) {
      if (err) {
        errorHandle(err,next);
      } else {
        res.end();
      }
    });
});

/* POST signin user */
router.post('/signin',function (req,res,next) {
  var name = req.body.name || '';
  var pass = req.body.pass || '';

  UserModel.findOne({name},function (err,user) {
    if (err || !user) {
      return errorHandle(new Error('用户不存在'),next);
    } else {
      var isOK = bcrypt.compareSync(pass,user.pass);
      if (!isOK) {
        return errorHandle(new Error('输入的密码有误'),next);
      }

      var authToken = user._id;
      var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed:true,
        httpOnly:true
      };

      res.cookie(config.cookieName,authToken,opts);
      res.end();
    }
  });


});

module.exports = router;
