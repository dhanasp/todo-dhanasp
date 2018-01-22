const DefaultHandler = require('./defaultHandler.js');
class PostTodoHandler extends DefaultHandler {
  constructor(todoHandler,fs,filePath){
    super();
    this.todoHandler = todoHandler;
    this.fs =fs;
    this.filePath = filePath;
  }
  execute(req,res){
    this.todoHandler.addTodo(req.body);
    let user = req.cookie.userName;
    let titlesTemplate = this.todoHandler.getTitlesTemplate(user);
    this.fs.writeFile(this.filePath,`var data = \`${titlesTemplate}\``,(err)=>{});
    res.redirect('/home');
  }
}
module.exports = PostTodoHandler;