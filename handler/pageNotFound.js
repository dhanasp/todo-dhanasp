const DefaultHandler = require('./defaultHandler.js');
class PageNotFound extends DefaultHandler {
  constructor(){
    super();
  }
  execute(req,res){
    res.statusCode = 404;
    res.write('Page Not Found!');
    res.end();
  }
}
module.exports = PageNotFound;