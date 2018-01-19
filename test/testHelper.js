const chai = require('chai');
const assert = chai.assert;

const isEqualStatusCode=(resStatus, expected)=>{
  assert.equal(resStatus, expected);
};
exports.isEqualStatusCode = isEqualStatusCode;

const hasCookie = (res,cookie,message)=>{
  let cookieText = res.headers['Set-Cookie'];
  assert.include(cookieText,`${cookie}=${message}`);
};
exports.hasCookie = hasCookie;
