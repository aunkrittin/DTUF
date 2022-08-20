import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col, Table, Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import {
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  collection,
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
  const studentEviCollectionRef = collection(
    db,
    `rooms/${roomID}/students_join_room/`
  );

  //   console.log(studentEviCollectionRef);

  async function getEviData() {
    onSnapshot(studentEviCollectionRef, (snapshot) => {
      if (snapshot.docs.length === 0) {
        return console.log("Not Found Data");
      } else {
        setEviData(
          snapshot.docs.map((doc) => {
            let data = doc.data();
            // console.log(`data: ${data}`);
            return { id: doc.id, ...data };
          })
        );
      }
    });
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
                          <th>Join</th>
                          <th>Leave</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eviData.map((data) => {
                          {
                            return (
                              <tr key={data.id}>
                                <td>
                                  {data.activities
                                    .filter(
                                      (join) => join.action == "join_room"
                                    )
                                    .map((filteredJoin) => {
                                      return filteredJoin.action;
                                    })}
                                </td>
                                <td></td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </Table>
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
                          <th>Join</th>
                          <th>Leave</th>
                        </tr>
                      </thead>
                      {/* <tbody></tbody> */}
                    </Table>
                    <h1>Evidences Not Found</h1>
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
