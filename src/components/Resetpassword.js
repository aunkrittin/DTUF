import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import firebaseConfig from "../config";
import { getFirestore } from "@firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

const db = getFirestore(firebaseConfig);

function Results() {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const resetPassword = async () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Password Reset Email Completed!",
          icon: "success",
          text: "Password reset email was sent please check your email or junk mail",
          confirmButtonText: "Ok",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Failed to reset password",
          icon: "error",
          text: "Email not found",
        });
      });
  };

  return (
    <>
      <div className="container mt-5">
        <Container>
          <Row className="home-main-row">
            <Col>
              <Card className="p-5">
                <Card.Body>
                  <h1>Reset password</h1>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-success"
                    style={{ marginRight: "5px" }}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: "5px" }}
                    onClick={resetPassword}
                  >
                    Reset
                  </button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Results;
