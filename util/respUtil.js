// 专门用于返回
function writeResult(status,msg,data){
    return JSON.stringify({status:status,msg:msg,data:data});
}
module.exports.writeResult = writeResult;