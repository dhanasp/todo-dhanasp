const loadPage=function(){
  document.getElementById('addItem').onclick=addItem;
}
const addItem=function(){
  let list = document.createElement('li');
  let item=document.getElementById('item').value;
  document.getElementById('itemList').appendChild(list).innerText=item;
  document.getElementById('item').value = "";
  
}





window.onload=loadPage;