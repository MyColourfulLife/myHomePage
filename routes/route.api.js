var express = require("express");
var router = express.Router();
var CategoryModel = require("../models/category");

/** 获取前10个数据 */
router.get("/top10", function(req, res, next) {
  // let numbers = req.query.numbers || 10;

  //     CategoryModel.find({},function (err,res) {
  //         if (res.length > numbers) {
  //             res.slice(0,);
  //         }
  //     });

  res.json({
    items: [
      "page1",
      "page2",
      "page3",
      "page4",
      "page5",
      "page6",
      "page7",
      "page8",
      "page9",
      "page10"
    ]
  });
});

/** 获取分类*/
router.get("/posts/categories", function(req, res, next) {
  console.log("i am coming");
  CategoryModel.find({}, {}, function(err, categories) {
    if (err) {
      res.json({
        sucess: false,
        errmessage: err.message
      });
    } else {
      res.json({
        sucess: true,
        categorylist: categories
      });
    }
  });
});

router.get("/posts/category", function(req, res, next) {
  let id = req.query.id;
});

module.exports = router;
