class Item {
  constructor() {
    this.item={};
  }
  add(name,isDone=false){
    this.item.name=name;
    this.item.isDone = isDone;
  }
  getItem(){
    return this.item;
  }
  edit(editedText){
    this.item.name=editedText;
  }
  markAsDone(){
    this.item.isDone=true;
  }
  markAsUndone(){
    this.item.isDone=false;
  }
}
module.exports = Item;