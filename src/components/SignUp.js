import React, { useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import firebaseConfig from "../config";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      // console.log(email.value, password.value);
      if (email.value === "" || password.value === "") {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Please enter your email or password",
        });
      } else if (email.value && password.value) {
        firebaseConfig
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((result) => {
            setCurrentUser(true);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === "auth/email-already-in-use") {
              // alert("You already have an account with that email.");
              Swal.fire({
                title: "Error",
                icon: "error",
                text: "Account already exists.",
              });
            } else if (errorCode === "auth/invalid-email") {
              // alert("Please provide a valid email");
              Swal.fire({
                title: "Error",
                icon: "error",
                text: "Please fill a correct provide email",
              });
            } else if (errorCode === "auth/weak-password") {
              // alert("The password is too weak.");
              Swal.fire({
                title: "Error",
                icon: "error",
                text: "The password is too weak!",
              });
            } else {
              alert(errorMessage);
            }
          });
      }
    } catch (error) {
      alert(error);
    }
  };
  const [currentUser, setCurrentUser] = useState(null);
  if (currentUser) {
    Swal.fire({
      title: "Signup success",
      icon: "success",
      text: "You have successfully registered",
    }).then((result) => {
      navigate("/", { replace: true });
    });
  }

  return (
    <>
      <div className="container mt-5">
        <Container>
          <Row className="home-main-row">
            <Col>
              <Card className="p-5">
                <Card.Body>
                  <h1>Sign Up</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="inputEmail" className="form-label">
                        Email address:
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="inputEmail"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputPassword" className="form-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="inputPassword"
                      />
                    </div>
                    <div className="register-btn">
                      <Button type="submit" className="btn btn-success">
                        Register
                      </Button>
                      <Link to="/login" className="btn btn-primary">
                        Log in
                      </Link>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
