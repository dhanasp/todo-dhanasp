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
    let titlesTemplate = this.todoHandler.getTitlesTemplate();
    this.fs.writeFile(this.filePath,`var data = \`${titlesTemplate}\``,(err)=>{});
    res.redirect('/home');
  }
}
module.exports = PostTodoHandler;