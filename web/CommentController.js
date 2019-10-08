var blogDao = require('../dao/BlogDao');
var commentDao = require('../dao/CommentDao');
var tagBlogMappingDao = require('../dao/TagBlogMappingDao.js');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var captcha = require("svg-captcha");
//生产随机验证码的包

var url = require('url');
var path = new Map();

function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent),params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    });
}
path.set("/addComment", addComment);

//生产随机验证码
function queryRandomCode(request, response) {
    var img = captcha.create({fontSize: 50, width: 100, height: 34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);

//获取留言
function queryCommentsByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);

//留言总条数
function queryCommentsCountByBlogId(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentCountByBlogId(parseInt(params.bid), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

//最新评论
function queryNewComments(request, response) {
    commentDao.queryNewComments(5, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
}
path.set("/queryNewComments", queryNewComments);

module.exports.path = path;