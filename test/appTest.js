const chai = require('chai');
const assert = chai.assert;
const app = require('../app.js');
const request = require('./testSetup.js');

describe('App Test',()=>{
  describe('404,Page Not Found ',()=>{
    it('should show page not found for invalid/bad request',()=>{
      request(app,{method:'GET',url:'/badFile'},(res)=>{
        assert.equal(res.statusCode,404);
      })
    })
  })
})