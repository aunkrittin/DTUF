import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

function Register() {
  const [fnameReg, setfnameReg] = useState("");
  const [lnameReg, setlnameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [telReg, setTelReg] = useState("");

  const register = () => {
    axios
      .post("http://localhost:3001/register", {
        fname: fnameReg,
        lname: lnameReg,
        username: usernameReg,
        password: passwordReg,
        email: emailReg,
        tel: telReg,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="home-body mt-5">
      <Container>
        <Row className="home-main-row">
          <Col>
            <Card className="p-5">
              <Card.Body>
                <h1>Register</h1>
                <br />
                <label htmlFor="fname">First name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  onChange={(e) => {
                    setfnameReg(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="lname">Last name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  onChange={(e) => {
                    setlnameReg(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="username">Username:</label>
                <input
                  type="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsernameReg(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="pwd">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmailReg(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="tel">Phone number:</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    setTelReg(e.target.value);
                  }}
                />
                <br />
                <Button onClick={register} className="btn btn-success">
                  Register
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
