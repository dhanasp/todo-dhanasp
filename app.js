const webApp = require('./webApp.js');
const LoggerHandler = require('./handler/loggerHandler.js');
const FileHandler = require('./handler/fileHandler.js');
const GetLoginHandler = require('./handler/getLoginHandler.js');
const PostLoginHandler = require('./handler/postLoginHandler.js');
const LogoutHandler = require('./handler/logoutHandler.js');
const LoadUser = require('./handler/loadUser.js');
const PageNotFound = require('./handler/pageNotFound.js');
const fs = require('fs');
let app= webApp.create();
  
const postTodo=function(req,res){
  console.log(req.body);
  res.redirect('/home');
}

const checkForLogin = function(req,res){
  if(req.url=='/'){
    req.url = '/login'
  }
};

app.use(checkForLogin)
app.use(new LoggerHandler(fs,'./request.log').getRequestHandler());
app.use(new LoadUser().getRequestHandler());
app.get('/login',new GetLoginHandler(fs).getRequestHandler())
app.post('/login',new PostLoginHandler().getRequestHandler())
app.get('/logout',new LogoutHandler().getRequestHandler())
app.post('/post_addTodo',postTodo);
app.postServe(new FileHandler('public',fs).getRequestHandler());
app.postServe(new PageNotFound().getRequestHandler());

module.exports = app;