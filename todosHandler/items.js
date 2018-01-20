const Item = require('./item.js');
class Items {
  constructor(){
    this.items={};
    this.id = 1;
  }
  parse(itemList){
    itemList.forEach((itemName)=>{
      this.addNewItem(itemName);
    });
  }
  getItems(){
    return this.items;
  }
  inceaseId(){
    this.id++;
  }
  delete(itemId){
    delete this.items[itemId];
  }
  addNewItem(itemName){
    let item = new Item();
    item.add(itemName);
    this.items[this.id] =item.getItem();
    this.inceaseId();
  }
}
module.exports = Items;