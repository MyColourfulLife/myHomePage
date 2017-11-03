var express = require("express");
var router = express.Router();

/** 获取前10个数据 */
router.get('/top10',function (req,res,next) {
    res.json({
       items:['page1','page2','page3','page4','page5','page6','page7','page8','page9','page10']
    });
});

/** 获取分类 */
router.get('/top10',function (req,res,next) {
    res.json({
       items:['page1','page2','page3','page4','page5','page6','page7','page8','page9','page10']
    });
});

module.exports = router;