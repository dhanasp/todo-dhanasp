const DefaultHandler = require('./defaultHandler.js');
const getFilePath=require('../lib.js').getFilePath;
const getContentType=require('../lib.js').getContentType;

class FileHandler extends DefaultHandler{
  constructor(root,fs){
    super();
    this.root=root;
    this.fs =fs;
  }
  execute(req,res){
    let error = req.cookie.error || '';
    let filePath = getFilePath(req.url);
    let type = getContentType(filePath);
    let path = `${this.root}/${filePath}`;
    if(this.fs.existsSync(path)){
      let data = this.fs.readFileSync(path,'utf-8');
      res.statusCode = 200;
      res.setHeader('Content-Type',type);
      data = data.replace(/LOGIN_ERROR/, error);
      res.write(data);
      res.end();      
    }
  }
}

module.exports = FileHandler;