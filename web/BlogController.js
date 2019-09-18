var blogDao = require('../dao/BlogDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var url = require('url');
var path = new Map();

function editBlog(request,response) {
    var params = url.parse(request.url,true).query;
    var tags = params.tags.replace(/ /g, '').replace('，',',');
    request.on('data',function (data) {
        blogDao.insertBlog(params.title,data.toString(),0,tags,timeUtil.getNow(),timeUtil.getNow(),function (result) {
            response.write(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
            
            var blogId = result.insertId;
            var tagList = tags.split(',');
            for(var i = 0; i < tagList.length; i ++){
                if(tagList[i] == ''){
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        });
    })
}

function queryTag() {
    
}
