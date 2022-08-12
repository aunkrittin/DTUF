import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          setLoginStatus(response.data[0].username);
        }
      });
  };

  return (
    <div className="home-body mt-5">
      <Container>
        <Row className="home-main-row">
          <Col>
            <Card className="p-5">
              <Card.Body>
                <h1>Login</h1>
                <br />
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <Button onClick={login} className="btn btn-success">
                  Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h1>{loginStatus}</h1>
      </Container>
    </div>
  );
}

export default Login;
