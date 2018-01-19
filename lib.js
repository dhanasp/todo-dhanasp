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