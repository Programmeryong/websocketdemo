const path = require('path');
const ejs = require('ejs');
const express = require("express");
const app = express();
// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 80);

//设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'html'));
app.use(express.static(path.join(__dirname, '/html')));
//设定使用的模板的后缀名
app.set("view engine","html");
//运行模板的方法
app.engine("html",ejs.__express);

app.get('/', function(req, res){
    res.render("index");  // 重定向
});

app.listen(app.get('port'), function(){
    console.log(' 服务已经开启，端口为：'+app.get('port'));
});