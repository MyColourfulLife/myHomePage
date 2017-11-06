var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 创建类别表
var CategorySchema = new Schema({
    type:String
});

// 关联类别表

var Category = mongoose.model('Categories',CategorySchema);

module.exports = Category;
