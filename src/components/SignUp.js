import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import firebaseConfig from "../config";

const SignUp = () => {
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
      } else {
        firebaseConfig
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        setCurrentUser(true);
      }
    } catch (error) {
      alert(error);
    }
  };
  const [currentUser, setCurrentUser] = useState(null);

  if (currentUser) {
    // Swal.fire({
    //   title: "Success",
    //   icon: "success",
    // });
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <div className="container mt-5">
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
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
