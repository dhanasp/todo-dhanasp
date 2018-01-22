const webApp = require('./webApp.js');
const LoggerHandler = require('./handler/loggerHandler.js');
const FileHandler = require('./handler/fileHandler.js');
const GetLoginHandler = require('./handler/getLoginHandler.js');
const PostLoginHandler = require('./handler/postLoginHandler.js');
const LogoutHandler = require('./handler/logoutHandler.js');
const LoadUser = require('./handler/loadUser.js');
const PageNotFound = require('./handler/pageNotFound.js');
const PostTodoHandler = require('./handler/postTodoHandler.js');
const fs = require('fs');
let app= webApp.create();
const TodoHandler = require('./todosHandler/todoHandler.js');
let todoHandler = new TodoHandler();  

const serveLogin = function(req,res){
  req.url = '/login'
};

app.use(new LoggerHandler(fs,'./request.log').getRequestHandler());
app.use(new LoadUser().getRequestHandler());
app.get('/',serveLogin);
app.get('/login',new GetLoginHandler(fs).getRequestHandler())
app.post('/login',new PostLoginHandler(todoHandler).getRequestHandler())
app.get('/logout',new LogoutHandler().getRequestHandler())
app.post('/post_addTodo',new PostTodoHandler(todoHandler,fs,'public/js/data.js').getRequestHandler());
app.postServe(new FileHandler('public',fs).getRequestHandler());
app.postServe(new PageNotFound().getRequestHandler());

module.exports = app;