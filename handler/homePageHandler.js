const DefaultHandler=require('./defaultHandler.js');
class HomePageHandler extends DefaultHandler {
  constructor(fs,todoHandler){
    super();
    this.fs=fs;
    this.todoHandler=todoHandler;    
  }
  execute(req,res){
    let user = req.cookies.userName;
    let titlesTemplate = this.todoHandler.getTitlesTemplate(user);
    let data = this.fs.readFileSync(`public/home.html`,'utf-8');
    data = data.replace(/TODO_LIST/,titlesTemplate);
    res.send(data);
  }
}
module.exports=HomePageHandler;

