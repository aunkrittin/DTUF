import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { AuthContext } from "../components/Auth";
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import firebaseConfig from "../config";
import { getFirestore } from "@firebase/firestore";
import Exam from "../components/Exam";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
const db = getFirestore(firebaseConfig);

function Student() {
  const { handle } = useParams();
  const [joined, setJoined] = useState();
  const [studentName, setStudentName] = useState();
  const [roomID, setroomID] = useState();
  const camLoggedRef = doc(db, "camLoggedIn", `${roomID}`);
  const studentsDocRef = doc(
    db,
    `rooms/${roomID}/students_join_room`,
    `${studentName}`
  );

  useEffect(() => {
    setroomID(handle);
  }, []);

  const joinRoom = async () => {
    try {
      let camLoggedSnap = await getDoc(camLoggedRef);
      let data = {
        student_name: studentName,
      };
      let camLogData = camLoggedSnap.data({ student_name: studentName });
      console.log(data.student_name);
      console.log(camLoggedSnap.data().student_name);
      if (data.student_name === camLogData.student_name) {
        const dataDoc = await getDoc(doc(db, "rooms", roomID));
        // console.log("student:" + dataDoc);
        if (dataDoc.exists()) {
          await setDoc(
            studentsDocRef,
            {
              activities: arrayUnion({
                action: "Join",
                timestamp: new Date(),
              }),
            },
            { merge: true }
          );
          setJoined(true);
        } else {
          Swal.fire({
            title: "Error!",
            text: "Room not found",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Room ID or name are not match please check and try again",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Room ID or name are not match please check and try again",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const { currentUser } = useContext(AuthContext);

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
      {currentUser ? (
        <div className="home-body mt-5">
          {!joined && (
            <Container>
              <Row className="home-main-row">
                <Col>
                  <Card className="p-5">
                    <Card.Body>
                      <label htmlFor="name" className="form-label">
                        Room ID:
                      </label>
                      <br />
                      <input
                        type="name"
                        className="form-control"
                        placeholder="Enter room name"
                        onChange={(e) => {
                          setroomID(e.target.value);
                        }}
                        defaultValue={handle}
                      />
                      <br />
                      <label htmlFor="name" className="form-label">
                        Student Name:
                      </label>
                      <br />
                      <input
                        type="name"
                        className="form-control"
                        placeholder="Enter name"
                        onChange={(e) => {
                          setStudentName(e.target.value);
                        }}
                      />
                      <br />
                      <Button onClick={joinRoom} className="btn btn-success">
                        Enter
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
          {joined && <Exam name={studentName} />}
        </div>
      ) : (
        Swal.fire({
          title: "Error!",
          text: "Please logout before join the room",
          icon: "error",
          confirmButtonText: "Close",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = "http://localhost:3000/dashboard";
            // return <Navigate to="/dashboard" />;
          }
        })
      )}
    </>
  );
}

export default Student;
