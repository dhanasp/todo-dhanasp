const Todos = require('./todos.js');
const lib = require('../lib.js');
class TodoHandler {
  constructor(){
    this.user=undefined;
    this.data={};
    this.todos = new Todos();
  }
  setUser(user){
    this.user = user;
    this.data = {}; //read from json
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
  getTodoTemplate(todoId){
    let todo = this.data[todoId];
    return lib.getTemplate(todo);
  }
}
module.exports = TodoHandler;
