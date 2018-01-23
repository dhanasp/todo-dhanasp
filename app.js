const webApp = require('./webApp.js');
const LoggerHandler = require('./handler/loggerHandler.js');
const FileHandler = require('./handler/fileHandler.js');
const GetLoginHandler = require('./handler/getLoginHandler.js');
const PostLoginHandler = require('./handler/postLoginHandler.js');
const LogoutHandler = require('./handler/logoutHandler.js');
const LoadUser = require('./handler/loadUser.js');
const PageNotFound = require('./handler/pageNotFound.js');
const PostTodoHandler = require('./handler/postTodoHandler.js');
const ViewTodoHandler = require('./handler/viewTodoHandler.js');
const HomePageHandler = require('./handler/homePageHandler.js');

const fs = require('fs');
let app= webApp.create();
const TodoHandler = require('./todosHandler/todoHandler.js');
let todoHandler = new TodoHandler();  
const users = [{userName: 'dhana'}];

const serveLogin = function(req,res){
  req.url = '/login'
};

const deleteTodo=function(req,res){
   let todoId=req.cookie.todoId;
   todoHandler.deleteTodo(todoId);
   res.redirect('/home');
}

const checkForLoggedUser = function(req,res){
  if(req.url!='/login' && !req.user){
    res.redirect('/login');
  }
}

app.use(new LoggerHandler(fs,'./request.log').getRequestHandler());
app.use(new LoadUser(users).getRequestHandler());
app.use(checkForLoggedUser);
app.get('/',serveLogin);
app.get('/login',new GetLoginHandler(fs).getRequestHandler());
app.post('/login',new PostLoginHandler(todoHandler,users).getRequestHandler());
app.get('/logout',new LogoutHandler().getRequestHandler());
app.get('/home',new HomePageHandler(fs,todoHandler).getRequestHandler());
app.get('/delete-todo',deleteTodo);
app.post('/addTodo',new PostTodoHandler(todoHandler,fs,'public/js/data.js').getRequestHandler());
app.postServe(new ViewTodoHandler(todoHandler,fs).getRequestHandler());
app.postServe(new FileHandler('public',fs).getRequestHandler());
app.postServe(new PageNotFound().getRequestHandler());

module.exports = app;