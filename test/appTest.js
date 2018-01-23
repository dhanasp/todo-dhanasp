const app = require('../app.js');
const request = require('./testSetup.js');
const testHelper = require('./testHelper.js');
let sessionId = new Date().getTime();
process.env.sessionId = sessionId;
describe('App Test',()=>{
  describe('/',()=>{
    it('should serve login page',(done)=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        testHelper.isEqualStatusCode(res,200);
        done();
      })
    })
  })
  describe('404,Page Not Found ',()=>{
    it('should show page not found for invalid/bad request',(done)=>{
      request(app,{method:'GET',url:'/badFile'},(res)=>{
        testHelper.isEqualStatusCode(res,404);
        done();
      })
    })
  })
  describe('login',()=>{
    it('should show login page',(done)=>{
      request(app,{method:'GET',url:'/login'},(res)=>{
        testHelper.isEqualStatusCode(res,200);
        done();
      })
    })
    it('should redirect to login for invalid user',(done)=>{
      request(app,{method:'POST',url:'/login'},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.shouldHaveCookie(res,'error','Invalid User');
        testHelper.isRedirectTo(res,'/login');
        done();
      })
    })
    it('should show login page with error message',(done)=>{
      request(app,{method:'GET',url:'/login',headers:{'cookie':'error=Invalid User'}},(res)=>{
        testHelper.isEqualStatusCode(res,200);
        testHelper.shouldNotHaveCookie(res,'error','Invalid User');        
        done();
      })
    })
    it('should redirect to home for valid user',(done)=>{
      request(app,{method:'POST',url:'/login',body:'userName=dhana'},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.isRedirectTo(res,'/home');
        done();
      })
    })
    it('should show login page and delete the error cookie',(done)=>{
      request(app,{method:'GET',url:'/login',headers:{'cookie':'error=Invalid User'}},(res)=>{
        testHelper.isEqualStatusCode(res,200);
        testHelper.shouldNotHaveCookie(res,'error','Invalid User');        
        done();
      })
    })
  })
  describe('logout',()=>{
    it('should redirect to login',(done)=>{
      request(app,{method:'GET',url:'/logout'},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.isRedirectTo(res,'/login');
        done();
      })
    })
    it('should redirect to login and delete all cookies',(done)=>{
      request(app,{method:'GET',url:'/logout',headers:{'cookie':`sessionId=${sessionId}`}},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.isRedirectTo(res,'/login');
        testHelper.shouldNotHaveCookie(res,'sessionId',sessionId);
        done();
      })
    }) 
  })
  describe('home',()=>{
    it('should show home page when user has session',(done)=>{
      request(app,{method:'GET',url:'/home',headers:{'cookie':`sessionId=${sessionId}`}},(res)=>{
        testHelper.isEqualStatusCode(res,200);
        testHelper.isBodyContains(res,'Home');
        done();
      })
    }) 
  })
  describe('create',()=>{
    it('should show creat todo page when user has session',(done)=>{
      request(app,{method:'GET',url:'/create',headers:{'cookie':`sessionId=${sessionId}`}},(res)=>{
        testHelper.isEqualStatusCode(res,200);
        testHelper.isBodyContains(res,'Create TODO')
        done();
      })
    })
  })
  describe('add todo',()=>{
    it('should add todo and redirect to home',(done)=>{
      request(app,{method:'POST',url:'/addTodo',body:'title=todoApp&desc=create todo&items=view&items=delete',headers:{'cookie':`userName=dhana`}},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.isRedirectTo(res,'/home');        
        done();
      })
    })
  })
  describe('view todo',()=>{
    it('should view specific todo in view page',(done)=>{
      request(app,{method:'GET',url:'/dhana/todo/1',headers:{'cookie':`userName=dhana`}},(res)=>{
        testHelper.isEqualStatusCode(res,200);
        testHelper.isBodyContains(res,'View Todo');        
        done();
      })
    })
  })
  describe('delete todo',()=>{
    it('should delete todo from todo list',(done)=>{
      request(app,{method:'GET',url:'/delete-todo',headers:{'cookie':`todoId=1`}},(res)=>{
        testHelper.isEqualStatusCode(res,302);
        testHelper.isRedirectTo(res,'/home');
        done();
      })
    })
  })
})