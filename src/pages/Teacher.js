import React, { useContext } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";

function Teacher() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-body mt-5">
      <Container>
        <Row className="home-main-row">
          <Col>
            <Card className="p-5">
              <Card.Body>
                <label htmlFor="name" className="form-label">
                  Room
                </label>
                <br />
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter room name"
                />
                <br />
                <br />
                <label htmlFor="link" className="form-label">
                  Google Forms
                </label>
                <br />
                <input
                  type="link"
                  className="form-control"
                  placeholder="Enter Google Forms Link"
                />
                <br />
                <Button className="btn btn-success">Enter</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Teacher;
