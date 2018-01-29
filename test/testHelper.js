const chai = require('chai');
const assert = chai.assert;

const isEqualStatusCode=(res, expected)=>{
  assert.equal(res.statusCode, expected);
};
exports.isEqualStatusCode = isEqualStatusCode;

const shouldHaveCookie = (cookieName,message)=>{
  return (res)=>{
    let cookieText = res.header['set-cookie'].join();
    let toCheck = encodeURI(`${cookieName}=${message}`);
    assert.include(cookieText,toCheck);
  }
};
exports.shouldHaveCookie = shouldHaveCookie;

const shouldNotHaveCookie = (cookieName,message)=>{
  return (res)=>{
    let cookieText = res.headers['set-cookie'].join();
    let toCheck = encodeURI(`${cookieName}=${message}`);    
    assert.notInclude(cookieText,toCheck);
  }
};
exports.shouldNotHaveCookie = shouldNotHaveCookie;

const isRedirectTo=(res,path)=>{
  let location = res.headers['location'];  
  assert.equal(location,path);
}
exports.isRedirectTo = isRedirectTo;

const isBodyContains = function(res,data){
  assert.isOk(res.body.includes(data),data);
}
exports.isBodyContains = isBodyContains;
