const webApp = require('./webApp.js');
const LoggerHandler = require('./handler/loggerHandler.js');
const FileHandler = require('./handler/fileHandler.js');
const fs = require('fs');
let app= webApp.create();

const registeredUsers = [{userName:'dhana'}]

const loadUser = function (req, res) {
  let sessionId = req.cookie.sessionId;
  let user = registeredUsers.find(regUser => regUser.sessionId == sessionId);
  if (sessionId && user) {
    req.user = user;
  }
};

const getLogin = function(req,res){
  let error = req.cookie.error || '';
  if(error){
    let expireDate =  new Date(0).toUTCString();
    res.setHeader('Set-Cookie',`error=; Expires=${expireDate}`)
  }
  fs.readFile('./public/login.html','utf-8',(err,data)=>{
    if(err) console.log(err);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    data = data.replace(/LOGIN_ERROR/,error);
    res.write(data);
    res.end();
  })
};

const getValidUser = function (req, res) {
  return registeredUsers.find(function (regUser) {
    return regUser.userName == req.body.userName;
  });
};

const showLoginFailed = function (res) {
  res.setHeader('Set-Cookie', `error=Invalid User`);
  res.redirect('/login');
};

const postLogin = function(req,res){
  let user = getValidUser(req, res);
  if (!user) {
    showLoginFailed(res);
    return;
  }
  let sessionId = new Date().getTime();
  process.env.sessionId = sessionId;
  user.sessionId = sessionId;
  res.setHeader('Set-Cookie',[`sessionId=${sessionId}`,`userName=${user.userName}`]);
  res.redirect('/home');
}

const getLogout=function(req,res){
  let expireDate =  new Date(0).toUTCString();
  res.setHeader('Set-Cookie',`sessionId; Expires=${expireDate}`)
  res.redirect('/login');
}


app.use(loadUser);
app.use(new LoggerHandler().getRequestHandler());
app.get('/login',getLogin);
app.post('/login',postLogin);
app.get('/logout',getLogout);
app.postServe(new FileHandler().getRequestHandler());
module.exports = app;