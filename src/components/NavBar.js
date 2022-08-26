import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import { FiVideo } from "react-icons/fi";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            Don't turn your face!! {""}
            <FiVideo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {currentUser ? (
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="nav-link" href="/teacher">
                  Teacher
                </Nav.Link>
                <Nav.Link className="nav-link" href="/results">
                  Results
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link
                  className="nav-link"
                  onClick={() => firebaseConfig.auth().signOut()}
                >
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          ) : (
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe">
                <Nav.Link className="nav-link" href="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="nav-link" href="/signup">
                  Register
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      {/* <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            Don't turn your face!! {""}
            <FiVideo />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {currentUser ? (
              <Nav className="me-auto">
                <Nav.Link className="nav-link" href="/teacher">
                  Teacher
                </Nav.Link>
                <Nav.Link className="nav-link" href="/results">
                  Results
                </Nav.Link>
                <Nav.Link
                  className="nav-link"
                  onClick={() => firebaseConfig.auth().signOut()}
                >
                  Logout
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link className="nav-link" href="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="nav-link" href="/signup">
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
}

export default NavBar;
