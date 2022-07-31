const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "dtuf",
});

app.post("/register", (req, res) => {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const tel = req.body.tel;

  db.query(
    "INSERT INTO accounts (firstname, lastname, username, password, email, tel) VALUES (?,?,?,?,?,?)",
    [firstname, lastname, username, password, email, tel],
    (err, result) => {
      console.log(" Don't have an Error");
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM accounts WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong Username/Password combination" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running server");
});
