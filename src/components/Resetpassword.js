import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
      {/* <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Don't turn your face!!</Navbar.Brand>
        </Container>
      </Navbar> */}
      <div className="container mt-5">
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
      </div>
    </>
  );
}

export default Results;
