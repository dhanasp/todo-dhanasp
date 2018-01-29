const DefaultHandler = require('./defaultHandler.js');
class ViewTodoHandler extends DefaultHandler {
  constructor(todoHandler,fs){
    super();
    this.todoHandler = todoHandler;
    this.fs = fs;
  }
  execute(req,res,next){
    let user = req.cookies.userName;
    if(req.url.startsWith(`/${user}/todo/`)){
      let todoId = req.url.split('/').pop();
      let todoTemplate = this.todoHandler.getTodoTemplate(todoId);
      let data = this.fs.readFileSync(`public/view.html`,'utf-8');
      data = data.replace(/TODO_DETAILS/,todoTemplate);
      res.cookie('todoId',todoId ,{path:'/'});
      res.send(data);
    }
    next();
  }
}
module.exports = ViewTodoHandler;