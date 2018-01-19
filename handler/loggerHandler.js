const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');
const toString = (data)=>{
  return JSON.stringify(data,null,2);
}

class LoggerHandler extends DefaultHandler{
  constructor(){
    super();
  }
  execute(req,res){
    let logs = [`-------------------------`,`method=>${req.method} url=>${req.url}`,
    `headers=>${toString(req.headers)}`,`cookie=>${toString(req.cookie)}`,
    `body=>${toString(req.body)}`].join('\n');
    fs.appendFile('./request.log',logs,(err)=>{
      if(err) console.log(err);
    })
  }
}

module.exports = LoggerHandler;