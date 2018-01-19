const loadPage=function(){
  document.getElementById('addItem').onclick=addItem;
  document.getElementById('submit').onclick=submitTodo;
}
const addItem=function(){
  let list = document.createElement('li');
  list.id="item";
  let item=document.getElementById('itemBox').value;
  if(!item) return;
  document.getElementById('itemList').appendChild(list).innerText=item;
  document.getElementById('itemBox').value = "";
}

const getItems=function(){
  let allItems=document.querySelectorAll('#item');
  let items = [];
  for (let index = 0; index < allItems.length; index++) {
    items.push(allItems[index].innerText);
  }
  return items;
}
const submitTodo=function(){
  let title=document.querySelector('#title').value;
  let desc=document.querySelector('#desc').value;
  let items=getItems();
  let xmlReq=new XMLHttpRequest();
  xmlReq.open('POST','post_addTodo');
  let data=`title=${title}&desc=${desc}&items=${items}`;
  xmlReq.send(data);
}
window.onload=loadPage;