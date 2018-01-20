const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');
const registeredUsers = [{userName: 'dhana'}]

class PostLoginHandler extends DefaultHandler {
  constructor() {
    super();
  }
  execute(req, res) {
    if (req.method == 'POST' && req.url == '/login') {
      let user = this.getValidUser(req, res);
      if (!user) {
        this.showLoginFailed(res);
        return;
      }
      let sessionId = new Date().getTime();
      process.env.sessionId = sessionId;
      user.sessionId = sessionId;
      res.setHeader('Set-Cookie', [`sessionId=${sessionId}`, `userName=${user.userName}`]);
      res.redirect('/home');
    }
  }
  getValidUser(req, res) {
    return registeredUsers.find(function (regUser) {
      return regUser.userName == req.body.userName;
    });
  }
  showLoginFailed(res) {
    res.setHeader('Set-Cookie', `error=Invalid User`);
    res.redirect('/login');
  }
}
module.exports = PostLoginHandler;