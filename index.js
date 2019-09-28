var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');

var app = new express();

app.use(express.static('./page/'));
// 编辑每日一句
app.post('/editEveryDay',loader.get('/editEveryDay'));
// 从数据库中拿到每日一句
app.get('/queryEveryDay',loader.get('/queryEveryDay'));

//编辑博客文章
app.post('/editBlog',loader.get('/editBlog'));
//查询博客文章
app.get('/queryBlogByPage',loader.get('/queryBlogByPage'));

app.listen(globalConfig.port,function () {
    console.log('服务已启动');
});