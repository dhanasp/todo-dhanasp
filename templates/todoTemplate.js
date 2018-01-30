const createTodoTemplate=function(todo){
  if(!todo) return '';
  let titleTemp = `<div id=\"title\">Title: ${todo.title}</div>`
  let descTemp = `<div id=\"desc\">Description: ${todo.desc}</div>`
  let itemTemp = Object.keys(todo.items).map(itemId=>{
    return `<div id=${itemId}><input type=\"checkbox\" id=\"${itemId}\"><span id=\"${itemId}\"> ${todo.items[itemId].name} </span><button id=\"${itemId}\" onclick=\"editItem()\"> Edit </button><button id=\"${itemId}\" onclick=\"deleteItem()\"> Delete </button></div>`;
  }).join('');
  return [titleTemp,descTemp,`<div id=\"items\">${itemTemp}</div>`].join('<br>');
}
module.exports = createTodoTemplate;