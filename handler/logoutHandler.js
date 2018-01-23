const DefaultHandler = require('./defaultHandler.js');
class LogoutHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req, res) {
    let expireDate = new Date(0).toUTCString();
    res.setHeader('Set-Cookie', [`sessionId; Expires=${expireDate}`,`userName; Expires=${expireDate}`,`todoId; Expires=${expireDate}`]);
    delete req.user.sessionId;
    res.redirect('/login');
  }
}

module.exports = LogoutHandler;