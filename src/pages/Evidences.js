import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Table,
  Button,
  Collapse,
} from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import { getDoc, doc } from "firebase/firestore";
import { ref, getStorage, listAll, getDownloadURL } from "firebase/storage";
import firebaseConfig from "../config";
import { getFirestore } from "@firebase/firestore";

const db = getFirestore(firebaseConfig);

function Evidences() {
  const { handle, handle2 } = useParams();
  const roomID = handle;
  const studentName = handle2;
  let navigate = useNavigate();
  const [eviData, setEviData] = useState([]);
  const [foundData, setFoundData] = useState("test");
  const storage = getStorage();
  const studentEviCollectionRef = doc(
    db,
    "rooms",
    `${roomID}`,
    "students_join_room",
    `${studentName}`
  );
  const [faceImgList, setFaceImgList] = useState([]);
  const faceListRef = ref(storage, ``);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, `images/${roomID}/${studentName}`);
  const [open, setOpen] = useState(false);

  async function getEviData() {
    try {
      const docSnap = await getDoc(studentEviCollectionRef);
      let data = docSnap.data();
      console.log(data.activities);
      if (data.activities === undefined) {
        console.log("Not found data");
        return setFoundData(false);
      } else {
        setEviData(data);
        setFoundData(true);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  function getFaceImgList() {
    listAll(faceListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFaceImgList((prev) => [...prev, url]);
        });
      });
    });
  }

  function getImageList() {
    listAll(imageListRef).then((response) => {
      // console.log(response.items.length);
      if (response.items.length === 0) {
        // return console.log("Image not found");
      } else {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url]);
          });
        });
      }
    });
  }

  useEffect(() => {
    getFaceImgList();
    getImageList();
    getEviData();
  }, []);

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {foundData ? (
        <div className="home-body mt-3">
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={12} md={10}>
                <Card className="p-5">
                  <h1>Evidences</h1>
                  <Card.Body>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Actions</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(eviData.activities || [])
                          // .filter((visible) => visible.action === "hidden")
                          .map((data) => {
                            let time = data.timestamp.toMillis();
                            let date = new Date(time);
                            let newDate =
                              // date.getDate() +
                              // "/" +
                              // (date.getMonth() + 1) +
                              // "/" +
                              // date.getFullYear() +
                              // " " +
                              date.getHours() +
                              ":" +
                              date.getMinutes() +
                              ":" +
                              date.getSeconds();
                            return (
                              <tr key={data.id}>
                                <td>{data.action}</td>
                                <td>{newDate}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                    <Button
                      onClick={() => navigate(-1)}
                      className="btn btn-danger"
                      style={{ marginRight: "5px" }}
                    >
                      Back
                    </Button>
                    <Button
                      id="evi-btn"
                      className="btn-primary"
                      onClick={() => setOpen(!open)}
                      aria-controls="collapse-text"
                      aria-expanded={open}
                    >
                      Images evidence
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="home-body mt-3">
            <Container>
              <Row className="justify-content-md-center">
                <Col xs={12} md={10}>
                  <Collapse in={open}>
                    <div id="collapse-text">
                      <Card className="p-3">
                        <h1>Images</h1>
                        <Card.Body>
                          {imageList.map((url) => {
                            return (
                              <img
                                style={{
                                  display: "block",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  marginBottom: "30px",
                                  width: "60%",
                                }}
                                width="700"
                                height="400"
                                src={url}
                              />
                            );
                          })}
                          {faceImgList.map((url) => {
                            return (
                              <img
                                style={{
                                  display: "block",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  marginBottom: "30px",
                                  width: "90%",
                                }}
                                width="900"
                                height="600"
                                src={url}
                              />
                            );
                          })}
                        </Card.Body>
                      </Card>
                    </div>
                  </Collapse>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ) : (
        <div className="home-body mt-3">
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={12} md={10}>
                <Card className="p-5">
                  <h1>Evidences</h1>
                  <Card.Body>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Actions</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                    </Table>
                    <h3>No Actions found</h3>
                    <br />
                    <Button
                      onClick={() => navigate(-1)}
                      className="btn btn-danger"
                      style={{ marginRight: "5px" }}
                    >
                      Back
                    </Button>
                    <Button
                      id="evi-btn"
                      className="btn-primary"
                      onClick={() => setOpen(!open)}
                      aria-controls="collapse-text"
                      aria-expanded={open}
                    >
                      Images evidence
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className="home-body mt-3">
            <Container>
              <Row className="justify-content-md-center">
                <Col xs={12} md={10}>
                  <Collapse in={open}>
                    <div id="collapse-text">
                      <Card className="p-3">
                        <h1>Images</h1>
                        <Card.Body>
                          <h3>No images found</h3>
                        </Card.Body>
                      </Card>
                    </div>
                  </Collapse>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

export default Evidences;
