var everyDayDao = require('../dao/EveryDayDao');
var timeUtil = require('../util/timeUtil');
var respUtil = require('../util/respUtil');
var path = new Map();

// 编辑每日一句
function editEveryDay(request,response){
    request.on('data',function(data){
        everyDayDao.insertEveryDay(data.toString().trim(),timeUtil.getNow(),function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null));
            response.end();
        });
    })
}
path.set('/editEveryDay',editEveryDay);


// 从数据库中取到每日一句
function queryEveryDay(request,response){
   everyDayDao.queryEveryDay(function(result){
    response.writeHead(200);
    response.write(respUtil.writeResult('success','查找成功',result));
    response.end();
   })
}
path.set('/queryEveryDay',queryEveryDay);


module.exports.path = path;