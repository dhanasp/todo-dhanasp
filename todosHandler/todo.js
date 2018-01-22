class Todo {
  constructor(){
    this.todo = {};
  }
  add(title,desc,items){
    this.todo.title = title;
    this.todo.desc = desc;
    this.todo.items = items;
  }
  getTodo(){
    return this.todo;
  }
}
module.exports = Todo;