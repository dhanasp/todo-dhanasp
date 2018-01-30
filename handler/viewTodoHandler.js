const DefaultHandler = require('./defaultHandler.js');
class ViewTodoHandler extends DefaultHandler {
  constructor(todoHandler,fs){
    super();
    this.todoHandler = todoHandler;
    this.fs = fs;
  }
  execute(req,res,next){
    let user = req.params.user;
    let todoId = req.params.id;
    if(user==req.cookies.userName && todoId>0){
      let todoTemplate = this.todoHandler.getTodoTemplate(todoId);
      let data = this.fs.readFileSync(`public/view.html`,'utf-8');
      data = data.replace(/TODO_DETAILS/,todoTemplate);
      res.cookie('todoId',todoId ,{path:'/'});
      req.url = '/';
      res.send(data);
      return;
    }
    res.redirect('/login');
  }
}
module.exports = ViewTodoHandler;