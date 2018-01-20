class TodoHandler {
  constructor(user){
    this.user=user;
    this.data={};
    this.id = 1;
  }
  addTodo(todoDetails){
    let todo = new Todo();
    todo.parse(todoDetails);
    let todo = todo.getParsedTodo();
    this.data[this.id]=todo;
    this.increaseId();
  }
  increaseId(){
    this.id++;
  }
}

