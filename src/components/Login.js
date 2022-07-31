import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Navigate to="/dashboard" />;
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
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me
            </label>
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
