const DefaultHandler = require('./defaultHandler.js');
class LogoutHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req, res) {
    let expireDate = new Date(0).toUTCString();
    res.clearCookie('sessionId');
    res.clearCookie('userName');
    res.clearCookie('todoId');
    delete req.user.sessionId;
    res.redirect('/login');
  }
}

module.exports = LogoutHandler;