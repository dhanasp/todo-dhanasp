const createTitleTemplate = function(user,data){
  let todoId = Object.keys(data);
  return todoId.map((id)=>{
    return `<a href=\"user/${user}/todo/${id}\">${data[id].title}</a>`;
  }).join('<br>');
}
module.exports = createTitleTemplate;