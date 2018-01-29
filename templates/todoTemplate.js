const createTodoTemplate=function(todo){
  if(!todo) return '';
  let titleTemp = `Title: <label>${todo.title}</label>`
  let descTemp = `Description: <label>${todo.desc}</label>`
  let itemTemp = Object.keys(todo.items).map(itemId=>{
    return `<p id=${itemId}><input type=\"checkbox\" id=\"${itemId}\"><label id=\"${itemId}\"> ${todo.items[itemId].name} </label><button id=\"${itemId}\" onclick=\"deleteItem()\"> Delete </button></p>`;
  }).join('<br>');
  return [titleTemp,descTemp,`<div id=\"items\">${itemTemp}</div>`].join('<br>');
}
module.exports = createTodoTemplate;