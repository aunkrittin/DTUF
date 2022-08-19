import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import Swal from "sweetalert2";

const Login = () => {
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
      } else {
        // if() {

        // }
        firebaseConfig
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .catch((error) => {
            var errorCode = error.code;
            var errorMsg = error.message;

            if (errorCode === "auth/user-not-found") {
              Swal.fire({
                title: "Error",
                icon: "error",
                text: "Email was not found. Please try again",
              });
            } else if (errorCode === "auth/wrong-password") {
              firebaseConfig
                .auth()
                .fetchProvidersForEmail(email.value, password.value)
                .then((result) => {
                  //
                });
              Swal.fire({
                title: "Wrong password",
                icon: "error",
                text: "Passwords do not match!",
              });
            } else {
              alert(errorMsg);
            }
          });
      }
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    Swal.fire({
      title: "Success",
      icon: "success",
    }).then(() => {
      navigate("/", { replace: true });
    });
  }

  return (
    <>
      {/* <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Don't turn your face!!</Navbar.Brand>
        </Container>
      </Navbar> */}
      <div className="container mt-5">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <Link to="/resetpassword" style={{ TextDecoration: "none" }}>
              Reset password
            </Link>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: "5px" }}
          >
            Log in
          </button>
          <Link
            to="/signup"
            className="btn btn-success"
            style={{ marginLeft: "5px" }}
          >
            Sign up
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
