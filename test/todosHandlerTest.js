const chai = require('chai');
const assert = chai.assert;
const Items=require('../todosHandler/items.js');
const Item=require('../todosHandler/item.js');
const Todo=require('../todosHandler/todo.js');
const Todos=require('../todosHandler/todos.js');
const TodoHandler=require('../todosHandler/todoHandler.js');


describe('Todos Handlers',()=>{
  describe('item',()=>{
    describe('add item',()=>{
      it('should add item and status',()=>{
      let  item= new Item();
      item.add('eat');
      let actual = item.getItem();
      let expected={name:'eat',isDone:false};
      assert.deepEqual(actual,expected);
      })
    })
    describe('edit item',()=>{
      it('should edit item',()=>{
      let  item= new Item();
      item.add('lunch')
      item.edit('dinner');
      let actual = item.getItem();
      let expected={name:'dinner',isDone:false};
      assert.deepEqual(actual,expected);
      })
    })
    describe('mark as done',()=>{
      it('should change status of item as done',()=>{
      let  item= new Item();
      item.add('lunch');
      item.markAsDone();
      let actual = item.getItem();
      let expected={name:'lunch',isDone:true};
      assert.deepEqual(actual,expected);
      })
    })
    describe('mark as not done',()=>{
      it('should change status of item as not done',()=>{
      let  item= new Item();
      item.add('lunch',true);
      item.markAsUndone();
      let actual = item.getItem();
      let expected={name:'lunch',isDone:false};
      assert.deepEqual(actual,expected);
      })
    })

  })
  describe('tests for items',()=>{
    describe('add Items',()=>{
      it('should add multiple items',()=>{
        let items=new Items();
        items.add(['eat','sleep']);
        let expected={1:{name:'eat',isDone:false},2:{name:'sleep',isDone:false}};
        let actual=items.getItems();
        assert.deepEqual(actual,expected);
      })
      it('should add single item',()=>{
        let items=new Items();
        items.add('eat');
        let expected={1:{name:'eat',isDone:false}};
        let actual=items.getItems();
        assert.deepEqual(actual,expected);
      })
     describe('delete Item',()=>{
      it('should delete given items',()=>{
        let items=new Items();
        items.add(['eat','sleep'])
        items.delete(2);
        let expected={1:{name:'eat',isDone:false}};
        let actual=items.getItems();
        assert.deepEqual(actual,expected);
      })
     })
     describe('add new Item',()=>{
      it('should addNewItem given items',()=>{
        let items=new Items();
        items.add(['breakfast','lunch'])
        items.addNewItem('dinner');
        let expected={1:{name:'breakfast',isDone:false},2:{name:'lunch',isDone:false},3:{name:'dinner',isDone:false}};
        let actual=items.getItems();
        assert.deepEqual(actual,expected);
      })
     })
    })
  })
  describe('todo',()=>{
    describe('add todo',()=>{
      it('should add todo details in a object',()=>{
        let todo = new Todo();
        todo.add('todoApp','create app',{1:{name:'view',isDone:false}});
        let actual = todo.getTodo();
        let expected = {title:'todoApp',desc:'create app',items:{1:{name:'view',isDone:false}}};
        assert.deepEqual(actual,expected);        
      })
    })
  })
  describe('todos',()=>{
    describe('addTodo',()=>{
      it('should add todo in todo list',()=>{
        let todos = new Todos();
        todos.addTodo({title:'todoApp',desc:'create app',items:['view']});
        let actual = todos.getTodos();
        let expected = {1:{title:'todoApp',desc:'create app',items:{1:{name:'view',isDone:false}}}};
        assert.deepEqual(actual,expected);        
      })
    })
    describe('delete Todo',()=>{
      it('should delete todo from todo list',()=>{
        let todos = new Todos();
        todos.addTodo({title:'todoApp',desc:'create app',items:['view']});
        todos.addTodo({title:'flower catalog',desc:'create flower catalog',items:[]});
        todos.delete(2);
        let actual = todos.getTodos();
        let expected= {1:{title:'todoApp',desc:'create app',items:{1:{name:'view',isDone:false}}}};
        assert.deepEqual(actual,expected);                      
      })
    })
  })
  describe('todoHandler',()=>{
    describe('addTodo',()=>{
      it('should add todo in users todos',()=>{
        let todoHandler = new TodoHandler();
        todoHandler.addTodo({title:'todoApp',desc:'create app',items:['view']});
        let actual = todoHandler.getUserTodos();
        let expected = {1:{title:'todoApp',desc:'create app',items:{1:{name:'view',isDone:false}}}};
        assert.deepEqual(actual,expected);        
      })
    })
    describe('get template of titles',()=>{
      it('should return templates of titles',()=>{
        let todoHandler = new TodoHandler();
        todoHandler.addTodo({title:'todoApp',desc:'create app',items:['view']});
        let actual = todoHandler.getTitlesTemplate('dhana');
        let expected= `<a href="dhana/todo/1">todoApp</a>`
        assert.deepEqual(actual,expected);                      
      })
    })
    describe('get Todo template',()=>{
      it('should return todo template',()=>{
        let todoHandler = new TodoHandler();
        todoHandler.addTodo({title:'todoApp',desc:'create app',items:['view']});
        let actual = todoHandler.getTodoTemplate(1);
        let expected = `Title: <label>todoApp</label><br>Description: <label>create app</label><br><input type="checkbox" id="1"><label id="1"> view </label><button id="1"> Delete </button>`
        assert.deepEqual(actual,expected);                              
      })
    })
  })
})