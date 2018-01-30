const Todos = require('./todos.js');
const createTodoTemplate = require('../templates/todoTemplate.js');
const createTitleTemplate = require('../templates/titleTemplate.js');
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
  getTitlesTemplate(user){
    return createTitleTemplate(user,this.data);
  }
  getUserTodos(){
    return this.data;
  }
  getTodoTemplate(todoId){
    let todo = this.data[todoId];
    return createTodoTemplate(todo);
  }
  deleteTodo(todoId){
    this.todos.delete(todoId);
  }
}
module.exports = TodoHandler;
