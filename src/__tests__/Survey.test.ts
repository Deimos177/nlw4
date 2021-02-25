import request from "supertest";
import { app } from "../app";

import createConnetion from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnetion();
    await connection.runMigrations();
  })
  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Title Example",
      description: "Description Example"
    })

    expect(response.status).toBe(201);
    //Verificando se existe a propriedade dentro do corpo de resposta
    expect(response.body).toHaveProperty("id")
  })
  it("Should return all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Title Example 2",
      description: "Description Example 2"
    })

    const response = await request(app).get("/surveys")

    expect(response.body.length).toBe(2);
  })
})
