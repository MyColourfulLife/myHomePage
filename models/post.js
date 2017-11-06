var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 表模型创建
var PostSchema = new Schema({
    categoryId:String,//类别id
    title:String,//标题
    content:String//内容
});

// 将模型与表关联
var PostModel = mongoose.model('Post',PostSchema);

module.exports = PostModel;
