var mongoose = require('mongoose');
var Category = require('./category');

var port = '32768';
var mongodbUrl = `mongodb://localhost:${port}/myblog`;



// 链接数据库 在app启动时引入
mongoose.connect(mongodbUrl,{
    useMongoClient:true
},function (err) {
    if (err) {
        console.log('链接出错:',err);
        return;
    }

    console.log('数据库链接成功');

    Category.findOne({type:'JavaScript'},function (err,res) {

        if (err) {
            console.log(err);
            return;
        }

        // TODO: 如果没有结果，插入三条数据
        if (res) {
            return;
        }

        let categories = ['JavaScript','Python','Swift','Objective-C'];

        categories.forEach(function(element) {
            
            let category = new Category();
            category.type = element;

            category.save(function (err,res) {
                if (err) {
                    console.log(err);
                }
            });

        }, this);

    });


});
