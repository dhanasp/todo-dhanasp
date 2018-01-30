const deleteItem=function(){
  let req=new XMLHttpRequest();  
  let id=event.target.id;
  req.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
      let item = document.getElementById(id);
      item.parentNode.removeChild(item);    
    }
  }
  req.open('POST','/deleteItem');
  req.send(`id=${id}`);
 
  // updateItems(id);
}

const markAsDone=function(){
  return;
}

const editItem=function(){
  return;
}

const updateItems=function(id){
  let req=new XMLHttpRequest();  
  req.  
  req.open('POST','/deleteItem');
  req.send(`id=${id}`);

}

const viewInputBox=function(){
  document.querySelector('.inputText').classList.remove('hidden');
  document.querySelector('input[name="text"]').focus();  
  document.querySelector('input[value="add"]').onclick=addItem;

}
const addItem=function(){
  document.querySelector('.inputText').classList.add('hidden');
  let items = document.querySelector('#items');
  let id=items.children.length+1;
  let div=document.createElement('div');
  div.id=id;
  let checkBox=createCheckBox(id);
  let inputBox = document.querySelector('input[name="text"]');
  let span =createSpan(id,inputBox.value);
  inputBox.value ="";
  let editButton=createButton('edit',id,editItem);
  let deleteButton=createButton('delete',id,deleteItem);
  [checkBox,span,editButton,deleteButton].forEach(child=>{
    div.appendChild(child);
  })
  items.appendChild(div);
}


const createCheckBox=function(id){
  let input =document.createElement('input');
  input.id=id;
  input.onclick=markAsDone;  
  input.type="checkbox";
  return input;
}

const createSpan = function(id,value){
  let span=document.createElement('span');
  span. id=id;
  span.innerText=value;
  return span;
}

const createButton=function(name,id,onclick){
  let button =document.createElement('button');
  button.id=id;
  button.onclick=onclick;  
  button.innerText=name;
  return button;
}

const load=function(){
  document.querySelector('#addItem').onclick=viewInputBox;
}
window.onload=load;