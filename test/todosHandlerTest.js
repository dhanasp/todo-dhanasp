const chai = require('chai');
const assert = chai.assert;
const Items=require('../todosHandler/items.js');
const Item=require('../todosHandler/item.js');


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
  describe('tests for item',()=>{
    describe('parseItems',()=>{
      it('should parse given items',()=>{
        let items=new Items();
        items.parse(['eat','sleep']);
        let expected={1:{name:'eat',isDone:false},2:{name:'sleep',isDone:false}};
        let actual=items.getItems();
        assert.deepEqual(actual,expected);
      })
     describe('delete Item',()=>{
      it('should delete given items',()=>{
        let items=new Items();
        items.parse(['eat','sleep'])
        items.delete(2);
        let expected={1:{name:'eat',isDone:false}};
        let actual=items.getItems();
        assert.deepEqual(actual,expected);
      })
     })
     describe('add new Item',()=>{
      it('should addNewItem given items',()=>{
        let items=new Items();
        items.parse(['breakfast','lunch'])
        items.addNewItem('dinner');
        let expected={1:{name:'breakfast',isDone:false},2:{name:'lunch',isDone:false},3:{name:'dinner',isDone:false}};
        let actual=items.getItems();
        assert.deepEqual(actual,expected);
      })
     })

     
    })
  })
})