const webApp = require('./webApp.js');
const fs = require('fs');
let app= webApp.create();

const registeredUser = [{userName:'dhana'}]

const loadUser = function(req,res){
  let user = req.body.userName;
  let isRegUser = registeredUser.some(regUser=>{
    regUser.userName == user;
  });
  if(isRegUser){
    req.user = user;
  }
}

const getLogin = function(req,res){
  fs.readFile('./public/login.html','utf-8',(err,data)=>{
    if(err) console.log(err);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.write(data);
    res.end();
  })
};

const postLogin = function(req,res){
  let user = req.user || '';
  if(user){
    let sessionId = new Date().getTime();
    process.env.sessionId = sessionId;
    res.setHeader('Set-Cookie',`sessionId=${sessionId}`);
    res.redirect('/home');
    return;
  }
  res.setHeader('Set-Cookie','error=Invalid User');
  res.redirect('/login');
}

app.use(loadUser);
app.get('/login',getLogin);
app.post('/login',postLogin);
module.exports = app;