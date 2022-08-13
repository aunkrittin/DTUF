import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import Camera from "./Camera";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { useParams, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
const db = getFirestore(firebaseConfig);

function Exam(props) {
  const studentName = props.name;
  const { handle } = useParams();
  const roomId = handle;
  const [finihed, setFinished] = useState();

  const finishTest = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Have you clicked on the Submit button at the bottom of the test?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, have finished Submitting",
      cancelButtonText: "No, haven't finished Submitting",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Swal.fire("Deleted!", "Your test has been deleted.", "success");
        const studentsDocRef = doc(
          db,
          `rooms/${roomId}/students_join_room`,
          `${studentName}`
        );
        await setDoc(
          studentsDocRef,
          {
            activities: arrayUnion({
              action: "leave_room",
              timestamp: new Date(),
            }),
          },
          { merge: true }
        );
      }
      setFinished("Hello");
    });
  };

  return (
    <>
      {!finihed ? (
        <div className="home-body mt-0">
          <Container>
            <Row className="home-main-row">
              <Col>
                <Card className="">
                  <Card.Body>
                    <iframe
                      src="https://forms.gle/FApBwKGD7TZhyenh9"
                      width="100%"
                      height="750"
                    ></iframe>
                    <Button onClick={finishTest} className="btn btn-success">
                      Finish
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Camera />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Exam;
