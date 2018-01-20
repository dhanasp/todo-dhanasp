const DefaultHandler = require('./defaultHandler.js');

class CompositeHandler extends DefaultHandler {
  constructor(){
    super();
    this.handlers = [];
  }
  execute(req,res){
    for(let i=0; i<this.handlers.length;i++){
      this.handlers[i].getRequestHandler();
      if(res.finished) return;
    }
  }
  addHandlers(handler){
    this.handlers.push(handler);
  }
}
module.exports = CompositeHandler;