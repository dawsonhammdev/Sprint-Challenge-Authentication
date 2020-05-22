const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeEach(() => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
});

//In this test I am registering a user and adding them to the DB and I am testing the status and body message.

test("POST /api/auth/register to be successful", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "devin", password: "hotsauce" });
    expect(res.status).toBe(200);
    console.log(res.status)
    expect(res.body).toMatchObject({
      message: "register successful",
      username: "devin",
    });
  });

  //In this test I am registering a user and then logging them in with the provded crednetials that were setup in registration. I am testing the status and body message, type, token property.

  test("POST /api/auth/login to be successful", async () => {
    const register = await request(server)
      .post("/api/auth/register")
      .send({ username: "devin", password: "hotsauce" });
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "devin", password: "hotsauce" });
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toMatchObject({ username: "devin" });
  });

  test("GET /api/jokes to get all jokes", async () => {
    const register = await request(server)
      .post("/api/auth/register")
      .send({ username: "devin", password: "hotsauce" });
    const login = await request(server)
      .post("/api/auth/login")
      .send({ username: "devin", password: "hotsauce" });
    const res = await request(server)
        .get("/api/jokes")
        .set("authorization", login.body.token)
        //   console.log(login.body.token)
        // expect(res.body).toHaveLength(20);
        expect(res.status).toBe(200);
    
  });



