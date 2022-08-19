import React, { useContext, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import { collection, addDoc } from "firebase/firestore";
import firebaseConfig from "../config";
import { getFirestore } from "@firebase/firestore";
import Exam from "../components/Exam";
import Swal from "sweetalert2";
const db = getFirestore(firebaseConfig);

function Teacher() {
  let navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [gForm, setGForm] = useState("");
  const roomsCollectionRef = collection(db, "rooms");
  const [timeDuration, setTimeDuration] = useState();

  const createRoom = async () => {
    if (roomName.trim() !== "" && gForm.trim() !== "") {
      await addDoc(roomsCollectionRef, {
        room_name: roomName.trim(),
        gformLink: gForm.trim(),
        user_id: currentUser.uid,
        timestamp: new Date(),
        timeDuration: parseInt(timeDuration),
      });
      Swal.fire({
        title: "Success",
        icon: "success",
      }).then(() => {
        navigate("/results", { replace: true });
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill the forms",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
    // <Results gURL={gForm} />;
    <Exam gURL={gForm} />;
  };

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
                  Room Name:
                </label>
                <br />
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter room name"
                  onChange={(e) => {
                    setRoomName(e.target.value);
                  }}
                  required
                />
                <br />
                <br />
                <label htmlFor="link" className="form-label">
                  Google Forms:
                </label>
                <br />
                <input
                  type="link"
                  className="form-control"
                  placeholder="Enter Google Forms Link"
                  onChange={(e) => {
                    setGForm(e.target.value);
                  }}
                  required
                />
                <br />
                <br />
                <label htmlFor="name" className="form-label">
                  Exam time(minutes):
                </label>
                <br />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Exam Time in minutes"
                  onChange={(e) => {
                    setTimeDuration(e.target.value);
                  }}
                  required
                />
                <br />
                <br />
                <Button onClick={createRoom} className="btn btn-success">
                  Create
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Teacher;
