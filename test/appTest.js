const chai = require('chai');
const assert = chai.assert;
const app = require('../app.js');
const request = require('./testSetup.js');
const testHelper = require('./testHelper.js');

describe('App Test',()=>{
  describe('404,Page Not Found ',()=>{
    it('should show page not found for invalid/bad request',()=>{
      request(app,{method:'GET',url:'/badFile'},(res)=>{
        testHelper.isEqualStatusCode(res.statusCode,404);
      })
    })
  })
  describe('login',()=>{
    it('should show login page',()=>{
      request(app,{method:'GET',url:'/login'},(res)=>{
        testHelper.isEqualStatusCode(res.statusCode,200);
      })
    })
    it('should redirect to login for invalid user',()=>{
      request(app,{method:'POST',url:'/login'},(res)=>{
        testHelper.isEqualStatusCode(res.statusCode,302);
        testHelper.hasCookie(res,'error','Invalid User');
      })
    })
    it('should show login page with error message',()=>{
      request(app,{method:'GET',url:'/login',headers:{'Cookie':'error=Invalid User'}},(res)=>{
        testHelper.isEqualStatusCode(res.statusCode,200);
        testHelper.hasCookie(res,'error','Invalid User');        
      })
    })
  })
})