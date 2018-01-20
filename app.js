const webApp = require('./webApp.js');
const LoggerHandler = require('./handler/loggerHandler.js');
const FileHandler = require('./handler/fileHandler.js');
const GetLoginHandler = require('./handler/getLoginHandler.js');
const PostLoginHandler = require('./handler/postLoginHandler.js');
const LogoutHandler = require('./handler/logoutHandler.js');
const CompositeHandler = require('./handler/compositeHandler.js'); 
const LoadUser = require('./handler/loadUser.js');
const PageNotFound = require('./handler/pageNotFound.js');
const fs = require('fs');
let app= webApp.create();

const postTodo=function(req,res){
  console.log(req.body);
  res.end();
}

const checkForLogin = function(req,res){
  if(req.url=='/'){
    req.url = '/login'
  }
};

let compositeHandler = new CompositeHandler();
compositeHandler.addHandlers(new LoggerHandler());
compositeHandler.addHandlers(new LoadUser());
compositeHandler.addHandlers(new GetLoginHandler(fs))
compositeHandler.addHandlers(new PostLoginHandler())
compositeHandler.addHandlers(new LogoutHandler())
compositeHandler.addHandlers(new FileHandler('public',fs));
compositeHandler.addHandlers(new PageNotFound());

app.use(checkForLogin)
app.use(compositeHandler.getRequestHandler())
// app.post('/post_addTodo',postTodo);
module.exports = app;