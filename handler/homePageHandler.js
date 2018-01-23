const DefaultHandler=require('./defaultHandler.js');
class HomePageHandler extends DefaultHandler {
  constructor(fs,todoHandler){
    super();
    this.fs=fs;
    this.todoHandler=todoHandler;    
  }
  execute(req,res){
    let user = req.cookie.userName;
    let titlesTemplate = this.todoHandler.getTitlesTemplate(user);
    let data = this.fs.readFileSync(`public/home.html`,'utf-8');
    data = data.replace(/TODO_LIST/,titlesTemplate);
    res.setHeader('content-type','text/html');
    res.write(data);
    res.end();
  }
}
module.exports=HomePageHandler;

