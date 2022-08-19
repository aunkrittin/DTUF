import React, { useState, useEffect } from "react";
import firebaseConfig from "../config";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
// import Camera from "./Camera";
import { doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PageVisibility from "react-page-visibility";
import { ref, getStorage, uploadString } from "firebase/storage";
import { v4 } from "uuid";
const db = getFirestore(firebaseConfig);

function Exam(props) {
  let navigate = useNavigate();
  const storage = getStorage();
  const studentName = props.name;
  const { handle } = useParams();
  const roomId = handle;
  const [finihed, setFinished] = useState();
  const [gformLink, setgformLink] = useState("");
  const [timeDisplay, setTimeDisplay] = useState("00:00:00");

  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (!imageUpload) return console.log("no data uploaded");
    const imageRef = ref(
      storage,
      `/images/${roomId}/${studentName}/${studentName}_${v4()}`
    );
    uploadString(imageRef, imageUpload, "data_url").then(() => {
      // alert("Image uploaded successfully");
      console.log("Uploaded image");
    });
  };

  const StreamConstraints = {
    audio: false,
    video: true,
  };

  const startCapture = (constraints) => {
    let video = document.querySelector("video");
    let canvas = (window.canvas = document.querySelector("canvas"));
    canvas.width = 480;
    canvas.height = 360;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const handleSuccess = (stream) => {
      window.stream = stream; // make stream available to browser console
      video.srcObject = stream;
    };
    return navigator.mediaDevices
      .getDisplayMedia(constraints)
      .then(handleSuccess)
      .catch((err) => {
        console.error(`Error:${err}`);
        return null;
      });
  };

  const stopCapture = () => {
    if (window.stream) {
      window.stream.getTracks().forEach((track) => {
        track.stop();
      });
      window.stream = null;
    }
  };

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
      let video = document.querySelector("video");
      let canvas = (window.canvas = document.querySelector("canvas"));
      canvas.width = 480;
      canvas.height = 360;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const timer = setTimeout(async () => {
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, canvas.height);

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

        let imageData = canvas.toDataURL();
        setImageUpload(imageData);
        uploadImage();
      }, 1500);
      return () => clearTimeout(timer);
    }
  };

  function getData() {
    getDoc(doc(db, "rooms", roomId)).then((data) => {
      const roomData = data.data();
      // console.log(data.data());
      // setTimeCount(data.data());
      setgformLink(roomData.gformLink);
      let seconds = roomData.timeDuration * 60; // แปลงนาทีเป็น วินาที
      const interval = setInterval(() => {
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let sec = Math.floor((seconds % 3600) % 60);
        // console.log("This will run every second!");

        // console.log(`${hours} : ${minutes} : ${sec}`);
        seconds = seconds - 1;
        setTimeDisplay(`${hours} : ${minutes} : ${sec}`);
        if (hours === 0 && minutes === 0 && sec === 0) {
          const forceFinish = async () => {
            const studentsDocRef = doc(
              db,
              `rooms/${roomId}/students_join_room`,
              `${studentName}`
            );
            function trustScore() {
              let tScore = 100;
              return tScore;
            }
            await setDoc(
              studentsDocRef,
              {
                activities: arrayUnion({
                  action: "leave_room",
                  timestamp: new Date(),
                }),
                trust_score: trustScore(),
              },
              { merge: true }
            );
            setFinished("Hello");
          };
          stopCapture();
          forceFinish();
        }
        // setTimeCount((timeCount) => seconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    });
  }

  useEffect(() => {
    startCapture(StreamConstraints);
    getData();
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
        function trustScore() {
          let tScore = 100;
          return tScore;
        }
        await setDoc(
          studentsDocRef,
          {
            activities: arrayUnion({
              action: "leave_room",
              timestamp: new Date(),
            }),
            trust_score: trustScore(),
          },
          { merge: true }
        );
        setFinished("Hello");
      }
      stopCapture();
    });
  };

  return (
    <>
      <PageVisibility onChange={handleVisibilityChange}></PageVisibility>
      {!finihed ? (
        <div className="home-body mt-0">
          <video playsInline autoPlay hidden></video>
          <canvas hidden></canvas>
          <h1 className="clock">{timeDisplay}</h1>
          <Container>
            <Row className="home-main-row">
              <Col>
                <Card className="">
                  <Card.Body>
                    <iframe
                      allow="display-capture"
                      src={gformLink}
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
          {/* <Camera /> */}
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Exam;
