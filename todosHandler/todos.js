const Todo=require('./todo.js'); 
const Items=require('./items.js'); 

class Todos {
  constructor(){
    this.id=1;
    this.todos={};
  }
  addTodo(todoData){
    let title = this.getTitle(todoData); 
    let desc = this.getDesc(todoData); 
    let items = this.getItems(todoData);     
    let todo = new Todo();
    todo.add(title,desc,items);
    this.todos[this.id] =todo.getTodo();
    this.increaseId();
  }
  getTodos(){
    return this.todos;
  }
  increaseId(){
    this.id++;
  }
  delete(todoId){
    delete this.todos[todoId];
  }
  getTitle(todoData){
    return todoData.title;
  }
  getDesc(todoData){
    return todoData.desc;
  }
  getItems(todoData){
    let items = new Items();
    items.add(todoData.items);
    return items.getItems();
  }
} 

module.exports = Todos;