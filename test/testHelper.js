const chai = require('chai');
const assert = chai.assert;

const isEqualStatusCode=(res, expected)=>{
  assert.equal(res.statusCode, expected);
};
exports.isEqualStatusCode = isEqualStatusCode;

const shouldHaveCookie = (res,cookie,message)=>{
  let cookieText = res.headers['Set-Cookie'];
  assert.include(cookieText,`${cookie}=${message}`);
};
exports.shouldHaveCookie = shouldHaveCookie;

const shouldNotHaveCookie = (res,cookie,message)=>{
  let cookieText = res.headers['Set-Cookie'];
  assert.notInclude(cookieText,`${cookie}=${message}`);
};
exports.shouldNotHaveCookie = shouldNotHaveCookie;

const isRedirectTo=(res,path)=>{
  let location = res.headers['location'];  
  assert.equal(location,path);
}
exports.isRedirectTo = isRedirectTo;

const isBodyContains = function(res,data){
  assert.equal(res.body,data);
}
exports.isBodyContains = isBodyContains;