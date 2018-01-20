const DefaultHandler = require('./defaultHandler.js');
class LogoutHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req, res) {
    if(req.method=='GET' && req.url=='/logout'){
      let expireDate =  new Date(0).toUTCString();
      res.setHeader('Set-Cookie',`sessionId; Expires=${expireDate}`)
      res.redirect('/login');
    }
  }
}

module.exports = LogoutHandler;