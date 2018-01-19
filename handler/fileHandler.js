const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');

class FileHandler extends DefaultHandler{
  constructor(){
    super();
  }
  execute(req,res){
    if(req.url=='/login') return;
    let filePath = `./public${req.url}.html`;
    // let filePath = getFilePath(req.url);
    // let type = getContentType(req.url);
    fs.readFile(filePath,'utf-8',(err,data)=>{
      if(err) console.log(err);
      res.statusCode = 200;
      res.setHeader('Content-Type','text/html');
      res.write(data);
      res.end();      
    })
  }
}

module.exports = FileHandler;