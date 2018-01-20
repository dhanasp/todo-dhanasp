const DefaultHandler = require('./defaultHandler.js');
const registeredUsers = [{userName:'dhana'}]

class LoadUser extends DefaultHandler {
  constructor(){
    super();
  }
  execute(req,res){
    let sessionId = req.cookie.sessionId;
    let user = registeredUsers.find(regUser => regUser.sessionId == sessionId);
    if (sessionId && user) {
      req.user = user;
    }
  }
}

module.exports = LoadUser;