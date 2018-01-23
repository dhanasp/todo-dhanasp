const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');

class PostLoginHandler extends DefaultHandler {
  constructor(todoHandler,users) {
    super();
    this.todoHandler=todoHandler;
    this.registeredUsers=users;
  }
  execute(req, res) {
    let user = this.getValidUser(req, res);
    if (!user) {
      this.showLoginFailed(res);
      return;
    }
    let sessionId = new Date().getTime();
    user.sessionId = sessionId;
    res.setHeader('Set-Cookie', [`sessionId=${sessionId}`, `userName=${user.userName}`]);
    this.todoHandler.setUser(user.userName);
    res.redirect('/home');
  }
  getValidUser(req, res) {
    return this.registeredUsers.find(function (regUser) {
      return regUser.userName == req.body.userName;
    });
  }
  showLoginFailed(res) {
    res.setHeader('Set-Cookie', `error=Invalid User`);
    res.redirect('/login');
  }
}
module.exports = PostLoginHandler;