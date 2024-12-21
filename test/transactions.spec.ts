import { execSync } from "node:child_process";
import {
  test,
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  expect,
} from "vitest";
import request from "supertest";

import { app } from "../src/app";

// Enunciado -> Opereação -> Validação
// E2E -> Teste de ponta a ponta -> Cada teste é realizado como se os outros testes não existissem

describe("Transactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  test("User should be able to create a new transaction", async () => {
    await request(app.server)
      .post("/transactions")
      .send({
        title: "Salário",
        amount: 5000,
        type: "credit",
      })
      .expect(201);
  });

  test("User should be able to list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "Salário",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: "Salário",
        amount: 5000,
      }),
    ]);
  });

  test("User should be able to get a transaction by id", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "Salário",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const transactionId = listTransactionsResponse.body.transactions[0].id;

    const getTransactionByIdResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200);

    expect(getTransactionByIdResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: "Salário",
        amount: 5000,
      })
    );
  });

  test("User should be able to get the summary", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "Salário",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie") ?? [];

    await request(app.server)
      .post("/transactions")
      .set("Cookie", cookies)
      .send({
        title: "Boleto",
        amount: 2700,
        type: "debit",
      });

    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies)
      .expect(200);

    expect(summaryResponse.body.summary).toEqual({
      amount: 2300,
    });
  });
});
