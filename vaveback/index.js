const express = require("express");
const app = express();
const port = 3000;
const database = require("./database");

const test = ["test1", "test2", "test3"];

app.get("/api/test", async (req, res) => {
  res.send(test);
});

app.get("/api/email", async (req, res) => {
  const result = await database.run(
    `SELECT userEmail FROM USERS WHERE userid=1`
  );
  res.send(result);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
