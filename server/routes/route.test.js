const request = require("supertest");
const app = require("../index");

describe("Test POST /auth/register", () => {
  test("It should respond with 200 success", async () => {
   const respond = await request(app)
      .post("/auth/register")
      .send({
        username: "username",
        email: "email@gmail.com",
        password: "kenny",
      })
      expect(respond.statusCode).toBe(200)
  });
});

describe("Test POST /auth/adminlogin", () => {
  test("It should respond with 200 success", async () => {
    const respond = await request(app)
      .post("/auth/adminlogin")
      .send({
        email: "jest@gmail.com",
        password: "kenny",
      })
      expect(respond.statusCode).toBe(200)
  });
  test("It should respond with 404", async () => {
    const respond = await request(app)
      .post("/auth/adminlogin")
      .send({
        email: "abc@gmail.com",
        password: "kenny",
      })
      expect(respond.statusCode).toBe(404)
  });
  test("It should respond with 401", async () => {
   const respond =  await request(app)
      .post("/auth/adminlogin")
      .send({
        email: "jest@gmail.com",
        password: "abc",
      })
      expect(respond.statusCode).toBe(401)
  });
});

describe("Test GET /category/", () => {
  test("It should respond with 200 success", async () => {
    let authToken = 'Bearer ' + 'some_token';
   const respond = await request(app)
      .get("/category/")
      .set('Authorization', authToken)
      expect(respond.statusCode).toBe(200)
  });
});

describe("Test POST /category/add_category with 200", () => {
  test("It should respond with 200 success",async()=>{
    const respond = await request(app)
      .post("/category/add_category")
      .send({
        categoryName: "tester",
      })
      expect(respond.statusCode).toBe(200)
  })
});
