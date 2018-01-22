const getContentType = function (filePath) {
  let extn = getExtension(filePath);  
  let types = {
    html: 'text/html',
    jpg: 'image/jpg',
    gif: 'image/gif',
    pdf: 'application/pdf',
    css: 'text/css',
    js: 'text/javascript'
  };
  return types[extn];
};
exports.getContentType=getContentType;

const getExtension=function(filePath){
  return filePath.split('.').pop();  
}

const getFilePath=function(filePath){
  let extn = getExtension(filePath);
  if(extn==filePath) 
  return `${filePath}.html`;
  return filePath;
}
exports.getFilePath=getFilePath;


const getTemplate=function(todo){
  let titleTemp = `Title: <label>${todo.title}</label>`
  let descTemp = `Description: <label>${todo.desc}</label>`
  let itemTemp = Object.keys(todo.items).map(itemId=>{
    return `<input type=\"checkbox\" id=\"${itemId}\"><label id=\"${itemId}\"> ${todo.items[itemId].name} </label><button id=\"${itemId}\"> Delete </button>`;
  }).join('<br>');
  return [titleTemp,descTemp,itemTemp].join('<br>');
}
exports.getTemplate = getTemplate;