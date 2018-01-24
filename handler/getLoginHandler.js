const DefaultHandler = require('./defaultHandler.js');
class GetLoginHandler extends DefaultHandler {
  constructor(fs) {
    super();
    this.fs=fs;
  }
  execute(req, res,next) {
    let error = req.cookies.error || '';
    if (error) {
      let expireDate = new Date(0).toUTCString();
      res.clearCookie('error');
    }
    this.fs.readFile('public/login.html','utf8',(err,data)=>{
      data = data.replace(/LOGIN_ERROR/, error);
      res.send(data);
      next();
    });
  }
}
module.exports = GetLoginHandler;