const request = require("supertest");
const app = require("./app");
const connectionPromise = require("./models/connection");
const mongoose = require("mongoose");

beforeAll(async () => {
  await connectionPromise;
});

afterAll(async () => {
  await mongoose.connection.close();
});

it("GET /users by Email", async () => {
  const email = "testunitable@gmail.com";

  const res = await request(app).get(`/users/search/by/${email}`);
  console.log(res.body);
  expect(res.body.user).toEqual(
    expect.objectContaining({
      _id: expect.any(String),
      lastName: expect.any(String),
      firstName: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
      token: expect.any(String),
    }),
  );

  expect(typeof res.body.user).toBe("object");
  expect(res.body.user.email).toBe(email);
  // password should be hashed
  expect(typeof res.body.user.password).toBe("string");
  expect(res.body.user.password.length).toBeGreaterThan(0);
  expect(res.body.user).not.toBeNull();
  expect(res.statusCode).toBe(200);
});
