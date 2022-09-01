import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import {
  doc,
  setDoc,
  arrayUnion,
  collection,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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

  // const camlogRef = collection(db, "camLoggedIn");

  useEffect(() => {
    setroomID(handle);
  }, []);

  const joinRoom = async () => {
    try {
      const camLoggedRef = doc(
        db,
        "camLoggedIn",
        `${roomID}`,
        `logged_in`,
        `${studentName}`
      );
      const studentsDocRef = doc(
        db,
        `rooms/${roomID}/students_join_room`,
        `${studentName}`
      );
      let data = {
        student_name: studentName,
      };
      // const q = query(camLoggedRef, where("student_name", "==", `${data}`));
      const querySnapshot = await getDoc(camLoggedRef);
      const camLogData = querySnapshot.data();
      // if (querySnapshot.data() === undefined) {
      //   console.log("data not matched");
      // }
      if (camLogData !== undefined) {
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
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Room ID or name are not match please check and try again",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <>
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
                      disabled
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
    </>
  );
}

export default Student;
