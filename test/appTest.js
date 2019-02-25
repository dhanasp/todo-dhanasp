const app = require("../app.js");
const request = require("supertest");
const th = require("./testHelper.js");

describe("App Test", () => {
  beforeEach(() => {
    app.users = [{ userName: "dhana", sessionId: "1234" }];
  });
  describe("/", () => {
    it("should serve login page", done => {
      request(app)
        .get("/")
        .expect(200)
        .expect(/Login/)
        .end(done);
    });
  });
  describe("404,Page Not Found ", () => {
    it("should show page not found for invalid/bad request", done => {
      request(app)
        .get("/bad")
        .expect(404)
        .end(done);
    });
  });
  describe("login", () => {
    it("should serve login page", done => {
      request(app)
        .get("/login")
        .expect(200)
        .expect("Content-Type", /html/)
        .expect(/Login/)
        .end(done);
    });
    it("should redirect to login for invalid user", done => {
      request(app)
        .post("/login")
        .set("user", "bad")
        .expect(302)
        .expect("Location", "/login")
        .expect(th.shouldHaveCookie("error", "Invalid User"))
        .end(done);
    });
    it("should show login page with error message and delete error cookie", done => {
      request(app)
        .get("/login")
        .set("cookie", "error=Invalid User")
        .expect(200)
        .expect(/Invalid User/)
        .expect(th.shouldNotHaveCookie("error", "Invalid User"))
        .end(done);
    });
    it("should redirect to home for valid user", done => {
      request(app)
        .post("/login")
        .send("userName=dhana")
        .expect(302)
        .expect("Location", "/home")
        .end(done);
    });
  });
  describe("logout", () => {
    it("should redirect to login", done => {
      request(app)
        .get("/logout")
        .expect(302)
        .expect("Location", "/login")
        .end(done);
    });
    it("should redirect to login and delete all cookies", done => {
      request(app)
        .get("/logout")
        .set("cookie", ["userName=dhana", "sessionId=1234"])
        .expect(302)
        .expect("Location", "/login")
        .expect(th.shouldNotHaveCookie("sessionId", "1234"))
        .end(done);
    });
  });
  describe("home", () => {
    it("should show home page when user has session", done => {
      request(app)
        .get("/home")
        .set("cookie", ["userName=dhana", "sessionId=1234"])
        .expect(200)
        .expect("Content-Type", /html/)
        .expect(/Home/)
        .end(done);
    });
    it("should redirect to login when user not have sesssion", done => {
      request(app)
        .get("/home")
        .expect(302)
        .expect("Location", "/login")
        .end(done);
    });
  });
  describe("create", () => {
    it("should show create todo page when user has session", done => {
      request(app)
        .get("/create.html")
        .set("cookie", ["userName=dhana", "sessionId=1234"])
        .expect(200)
        .expect("Content-Type", /html/)
        .expect(/create todo/)
        .end(done);
    });
    it("should redirect to login when user not have sesssion", done => {
      request(app)
        .get("/create.html")
        .expect(302)
        .expect("Location", "/login")
        .end(done);
    });
  });
  describe("add todo", () => {
    it("should add todo and redirect to home", done => {
      request(app)
        .post("/addTodo")
        .send("title=todoApp&desc=create todo&items=view&items=delete")
        .expect(302)
        .expect("Location", "/home")
        .end(done);
    });
  });
  describe("view todo", () => {
    it("should view specific todo in view page", done => {
      request(app)
        .get("/user/dhana/todo/1")
        .set("cookie", "userName=dhana")
        .expect(200)
        .expect("Content-Type", /html/)
        .expect(/View Todo/)
        .end(done);
    });
  });
  describe("delete todo", () => {
    it("should delete todo from todo list", done => {
      request(app)
        .get("/delete-todo")
        .set("cookie", "todoId=1")
        .expect(302)
        .expect("Location", "/home")
        .expect(/home/)
        .end(done);
    });
  });
});
