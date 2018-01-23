const DefaultHandler = require('./defaultHandler.js');
class LoadUser extends DefaultHandler {
  constructor(users){
    super();
    this.registeredUsers = users;
  }
  execute(req,res){
    let sessionId = req.cookie.sessionId;
    let user = this.registeredUsers.find(regUser => regUser.sessionId == sessionId);
    if (sessionId && user) {
      req.user = user;
    }
  }
}

module.exports = LoadUser;