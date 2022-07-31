const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://dtuf.herokuapp.com"); // update to match the domain you will make the request from
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
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const tel = req.body.tel;

  db.query(
    "INSERT INTO accounts (firstname, lastname, username, password, email, tel) VALUES (?,?,?,?,?,?)",
    [firstname, lastname, username, password, email, tel],
    (err, result) => {
      console.log(err);
    }
  );
});

app.listen(3001, () => {
  console.log("running server");
});
