const Item = require('./item.js');
class Items {
  constructor(){
    this.items={};
    this.id = 1;
  }
  add(itemList){
    if(typeof(itemList)=='string'){
      itemList = Array(itemList);
    }
    itemList.forEach((itemName)=>{
      this.addNewItem(itemName);
    });
  }
  getItems(){
    return this.items;
  }
  increaseId(){
    this.id++;
  }
  delete(itemId){
    delete this.items[itemId];
  }
  addNewItem(itemName){
    let item = new Item();
    item.add(itemName);
    this.items[this.id] =item.getItem();
    this.increaseId();
  }
}
module.exports = Items;