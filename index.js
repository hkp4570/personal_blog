var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');

var app = new express();

app.use(express.static('./page/'));

// 编辑每日一句
app.post('/editEveryDay',loader.get('/editEveryDay'));
//  从数据库中拿到每日一句
app.get('/queryEveryDay',loader.get('/queryEveryDay'));

//编辑博客文章
app.post('/editBlog',loader.get('/editBlog'));
//读取博客文章
app.get('/queryBolgByPage',loader.get('/queryBolgByPage'));
//读取博客文章所有数量
app.get('/queryBlogCount',loader.get('/queryBlogCount'));
//博客文章详情
app.get('/queryBlogById',loader.get('/queryBlogById'));
//添加留言
app.get('/addComment',loader.get('/addComment'));
//获取随机验证码
app.get('/queryRandomCode',loader.get('/queryRandomCode'));
//获取留言
app.get('/queryCommentsByBlogId',loader.get('/queryCommentsByBlogId'));
//获取留言条数
app.get('/queryCommentsCountByBlogId',loader.get('/queryCommentsCountByBlogId'));
//获取所有博客文章
app.get('/queryAllBlog',loader.get('/queryAllBlog'));
//获取随机标签
app.get('/queryRandomTags',loader.get('/queryRandomTags'));
//最近热门博客
app.get('/queryHotBlog',loader.get('/queryHotBlog'));
//最新评论
app.get('/queryNewComments',loader.get('/queryNewComments'));
//标签与文章对应
app.get('/queryByTag',loader.get('/queryByTag'));
//标签总数
app.get('/queryByTagCount',loader.get('/queryByTagCount'));

//查询所有博客文章
app.get('/queryAllBlog',loader.get('/queryAllBlog'));

app.listen(globalConfig.port,function () {
    console.log('服务已启动');
});