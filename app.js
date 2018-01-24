const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');
const LoggerHandler = require('./handler/loggerHandler.js');
const GetLoginHandler = require('./handler/getLoginHandler.js');
const PostLoginHandler = require('./handler/postLoginHandler.js');
const LogoutHandler = require('./handler/logoutHandler.js');
const LoadUser = require('./handler/loadUser.js');
const PostTodoHandler = require('./handler/postTodoHandler.js');
const ViewTodoHandler = require('./handler/viewTodoHandler.js');
const HomePageHandler = require('./handler/homePageHandler.js');

const fs = require('fs');
let app = express();
const TodoHandler = require('./todosHandler/todoHandler.js');
let todoHandler = new TodoHandler();
const users = [{
  userName: 'dhana'
}];

const serveLogin = function (req, res, next) {
  req.url = '/login';
  next();
};

const deleteTodo = function (req, res,next) {
  let todoId = req.cookies.todoId;
  todoHandler.deleteTodo(todoId);
  res.redirect('/home');
  next();
}

const checkForLoggedUser = function (req, res, next) {
  if (req.url != '/login' && !req.user) {
    res.redirect('/login');
  }
  next()
}

const deleteItem = function (req, res) {
  console.log(req.body);
  let id = req.body.id;
  console.log(id);

  // todoHandler.deleteTodo(id);
}

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static('public'));

app.use(new LoggerHandler(fs, './request.log').getRequestHandler());
app.use(new LoadUser(users).getRequestHandler());
app.use(checkForLoggedUser);
app.get('/',serveLogin);
app.route('/login')
  .get(new GetLoginHandler(fs).getRequestHandler())
  .post(new PostLoginHandler(todoHandler, users).getRequestHandler());
app.get('/logout',new LogoutHandler().getRequestHandler());
app.get('/home', new HomePageHandler(fs, todoHandler).getRequestHandler());
app.get('/delete-todo',deleteTodo);
// app.post('/deleteItem',deleteItem);
app.post('/addTodo',new PostTodoHandler(todoHandler,fs,'public/js/data.js').getRequestHandler());
app.use(new ViewTodoHandler(todoHandler,fs).getRequestHandler());

module.exports = app;