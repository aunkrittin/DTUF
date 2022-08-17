import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import Camera from "./Camera";
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { useParams, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import PageVisibility from "react-page-visibility";
const db = getFirestore(firebaseConfig);

function Exam(props) {
  const studentName = props.name;
  const { handle } = useParams();
  const roomId = handle;
  const [finihed, setFinished] = useState();
  const [gformLink, setgformLink] = useState("");
  const [timeDisplay, setTimeDisplay] = useState("00:00:00");

  const handleVisibilityChange = async (isVisible) => {
    // console.log(isVisible);
    if (isVisible) {
      const switchingTab = doc(
        db,
        `rooms/${roomId}/students_join_room`,
        `${studentName}`
      );
      await setDoc(
        switchingTab,
        {
          activities: arrayUnion({
            action: "visible",
            timestamp: new Date(),
          }),
        },
        { merge: true }
      );
      // console.log("you in page");
    } else {
      const switchingTab = doc(
        db,
        `rooms/${roomId}/students_join_room`,
        `${studentName}`
      );
      await setDoc(
        switchingTab,
        {
          activities: arrayUnion({
            action: "hidden",
            timestamp: new Date(),
          }),
        },
        { merge: true }
      );
      // console.log("sfgsdfdf");
    }
  };

  useEffect(() => {
    const startCapture = async (displayMediaOptions) => {
      let captureStream = null;

      try {
        captureStream = await navigator.mediaDevices.getDisplayMedia(
          displayMediaOptions
        );
      } catch (error) {
        console.log(`Error: ${error}`);
      }
      return captureStream;
    };

    startCapture();
    getDoc(doc(db, "rooms", roomId)).then((data) => {
      const roomData = data.data();

      // console.log(data.data());
      // setTimeCount(data.data());
      setgformLink(roomData.gformLink);

      let seconds = roomData.timeDuration * 60; // แปลงนาทีเป็น วินาที
      const interval = setInterval(() => {
        // console.log("This will run every second!");
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let sec = Math.floor((seconds % 3600) % 60);

        // console.log(`${hours} : ${minutes} : ${sec}`);
        seconds = seconds - 1;
        setTimeDisplay(`${hours} : ${minutes} : ${sec}`);
        // setTimeCount((timeCount) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    });

    // getRoomData();
  }, []);

  //const dataDoc =  getDoc(doc(db, "rooms", roomId));
  //   // setRoomdata(dataDoc.data());
  //   console.log(dataDoc);
  // };

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
        setFinished("Hello");
      }
    });
  };

  return (
    <>
      <PageVisibility onChange={handleVisibilityChange}></PageVisibility>
      {!finihed ? (
        <div className="home-body mt-0">
          <h1 className="clock">{timeDisplay}</h1>
          <Container>
            <Row className="home-main-row">
              <Col>
                <Card className="">
                  <Card.Body>
                    <iframe src={gformLink} width="100%" height="750"></iframe>
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
