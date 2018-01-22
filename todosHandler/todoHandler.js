const Todos = require('./todos.js');
class TodoHandler {
  constructor(){
    this.user=undefined;
    this.data={};
    this.todos = new Todos();
  }
  setUser(user){
    this.user = user;
  }
  addTodo(todoDetails){
    this.todos.addTodo(todoDetails);
    this.data = this.todos.getTodos();    
  }
  getTitlesTemplate(){
    let todoId = Object.keys(this.data);
    return todoId.map((id)=>{
      return `<a href=\"${this.user}/todo/${id}\">${this.data[id].title}</a>`;
    }).join('<br>');
  }
  getUserTodos(){
    return this.data;
  }
}
module.exports = TodoHandler;
