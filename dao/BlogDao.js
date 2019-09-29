var dbutil = require('./dbutil');

//博客文章插入
function insertBlog(title, content, views, tags, ctime, utime, success) {
    var insertSql = "insert into blog (`title`, `content`,`views`, `tags`,`ctime`, `utime`) values (?, ?, ?, ?, ?, ?)";
    var params = [title,content,views,tags,ctime,utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);

        }
    });
    connection.end();
}
//读取博客文章
function queryBlogByPage(page,pageSize,success) {
    var insertSql = "select * from blog order by id desc limit ?,?";
    var params = [page * pageSize ,pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);

        }
    });
    connection.end();
}

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;