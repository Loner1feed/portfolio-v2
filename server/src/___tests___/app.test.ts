import app from "../app";
import request from "supertest";

describe("GET /", () => {
  it("Responds with 'I'm alive' text", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("I'm alive");
  });
});
