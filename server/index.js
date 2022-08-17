const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const { MongoClient } = require("mongodb");
const uri = "mongodb://aun:aun@localhost:27017";

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users/create", async (req, res) => {
  const user = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client
    .db("dtuf")
    .collection("users")
    .insertOne({
      id: parseInt(user.id),
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  await client.close();
  res.status(200).send({
    status: "ok",
    message: "User with ID = " + user.id + " is created",
    user: user,
  });
  // console.log(user);
});
