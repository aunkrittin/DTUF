import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col, Table, Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import {
  onSnapshot,
  getDocs,
  getDoc,
  collection,
  query,
  orderBy,
  doc,
} from "firebase/firestore";
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
  const studentEviCollectionRef = doc(
    db,
    "rooms",
    `${roomID}`,
    "students_join_room",
    `${studentName}`
  );
  // const studentEviCollectionRef = collection(
  //   db,
  //   `rooms/${roomID}/students_join_room`
  // );

  // console.log(studentEviCollectionRef);

  // async function getEviData() {
  //   onSnapshot(studentEviCollectionRef, (snapshot) => {
  //     if (snapshot.docs.length === 0) {
  //       return console.log("Not Found Data");
  //     } else {
  //       setEviData(
  //         snapshot.docs.map((doc) => {
  //           let data = doc.data();
  //           // console.log(`data: ${data}`);
  //           return { id: doc.id, ...data };
  //         })
  //       );
  //     }
  //   });
  //   setFoundData(true);
  // }

  async function getEviData() {
    try {
      const docSnap = await getDoc(studentEviCollectionRef);
      let data = docSnap.data();
      // console.log(data.activities);
      setEviData(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    setFoundData(true);
  }

  useEffect(() => {
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
            <Row className="home-main-row">
              <Col>
                <Card className="p-3">
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
                          .filter((visible) => visible.action === "hidden")
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
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div className="home-body mt-3">
          <Container>
            <Row className="home-main-row">
              <Col>
                <Card className="p-3">
                  <h1>Evidences</h1>
                  <Card.Body>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Visible</th>
                          <th>Hidden</th>
                        </tr>
                      </thead>
                      {/* <tbody></tbody> */}
                    </Table>
                    <h1>Evidences Not Found</h1>
                    <Button
                      onClick={() => navigate(-1)}
                      className="btn btn-danger"
                      style={{ marginRight: "5px" }}
                    >
                      Back
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default Evidences;
