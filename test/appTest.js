const chai = require('chai');
const assert = chai.assert;
const app = require('../app.js');
const request = require('./testSetup.js');
const testHelper = require('./testHelper.js');
let sessionId = process.env.sessionId || '';

describe('App Test',()=>{
  describe('404,Page Not Found ',()=>{
    it('should show page not found for invalid/bad request',()=>{
      request(app,{method:'GET',url:'/badFile'},(res)=>{
        testHelper.isEqualStatusCode(res,404);
      })
    })
  })
  describe('login',()=>{
    it('should show login page',()=>{
      request(app,{method:'GET',url:'/login'},(res)=>{
        testHelper.isEqualStatusCode(res,200);
      })
    })
    it('should redirect to login for invalid user',()=>{
      request(app,{method:'POST',url:'/login'},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.shouldHaveCookie(res,'error','Invalid User');
        testHelper.isRedirectTo(res,'/login');
      })
    })
    it('should show login page with error message',()=>{
      request(app,{method:'GET',url:'/login',headers:{'Cookie':'error=Invalid User'}},(res)=>{
        testHelper.isEqualStatusCode(res,200);
        testHelper.shouldHaveCookie(res,'error','Invalid User');        
      })
    })
    it('should redirect to home for valid user',()=>{
      request(app,{method:'POST',url:'/login',body:'userName=dhana'},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.isRedirectTo(res,'/home');
      })
    })
  })
  describe('logout',()=>{
    it('should redirect to login',()=>{
      request(app,{method:'GET',url:'/logout'},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.isRedirectTo(res,'/login');
      })
    })
    it('should redirect to login and delete all cookies',()=>{
      request(app,{method:'GET',url:'/logout',headers:{'Cookie':`sessionId=${sessionId}`}},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.isRedirectTo(res,'/login');
        testHelper.shouldNotHaveCookie(res,'sessionId',sessionId);
      })
    }) 
  })
  describe('home',()=>{
    it('should show home page when user has session',()=>{
      request(app,{method:'GET',url:'/home',headers:{'Cookie':`sessionId=${sessionId}`}},(res)=>{
        testHelper.isEqualStatusCode(res,200);
        testHelper.shouldHaveCookie(res,'sessionId',sessionId);
      })
    })
    it('should redirect to login when user not have sesssion',()=>{
      request(app,{method:'GET',url:'/home'},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.shouldNotHaveCookie(res,'sessionId',sessionId);
        testHelper.isRedirectTo(res,'/login');
      })
    })
  })
})