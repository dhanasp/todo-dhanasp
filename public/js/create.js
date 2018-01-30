const loadPage=function(){
  document.getElementById('addItem').onclick=addItem;
}
const addItem=function(){
  let input = document.createElement('input');
  let br = document.createElement('br');  
  input.name="items";
  input.type="text";
  document.getElementById('itemList').appendChild(input);
  document.getElementById('itemList').appendChild(br)
  input.focus();
}

window.onload=loadPage;