const DefaultHandler = require('./defaultHandler.js');
const getFilePath=require('../lib.js').getFilePath;
const getContentType=require('../lib.js').getContentType;
const fs = require('fs');

class FileHandler extends DefaultHandler{
  constructor(root){
    super();
    this.root=root;
  }
  execute(req,res){
    if(req.url=='/login') return;
    let filePath = getFilePath(req.url);
    let type = getContentType(filePath);
    fs.readFile(`${this.root}/${filePath}`,'utf-8',(err,data)=>{
      if(err) console.log(err);
      res.statusCode = 200;
      res.setHeader('Content-Type',type);
      res.write(data);
      res.end();      
    })
  }
}

module.exports = FileHandler;