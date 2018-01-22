const DefaultHandler = require('./defaultHandler.js');
class ViewTodoHandler extends DefaultHandler {
  constructor(todoHandler,fs){
    super();
    this.todoHandler = todoHandler;
    this.fs = fs;
  }
  execute(req,res){
    let user = req.cookie.userName;
    if(req.url.startsWith(`/${user}/todo/`)){
      let id = req.url.split('/').pop();
      let template = this.todoHandler.getTodoTemplate(id);
      this.fs.writeFile('public/js/todo.js',`var todo = \`${template}\``,err=>{});
      req.url = '/view';
    }
  }
}
module.exports = ViewTodoHandler;