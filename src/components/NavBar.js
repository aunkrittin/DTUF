import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
// import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">Don't turn your face!!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {currentUser ? (
              <Nav className="me-auto">
                {/* <Nav.Link className="nav-link" href="/student">
                  Student
                </Nav.Link> */}
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
                {/* <Nav.Link className="nav-link" href="/student">
                  Student
                </Nav.Link> */}
              </Nav>
            )}

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
