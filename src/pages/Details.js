import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col, Table, Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import { collection, onSnapshot } from "firebase/firestore";
import firebaseConfig from "../config";
import { ref, getStorage, listAll } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const db = getFirestore(firebaseConfig);

function Details() {
  const { handle } = useParams();
  const roomID = handle;
  const storage = getStorage();
  let navigate = useNavigate();
  const [studentsData, setStudentsData] = useState([]);
  const [foundData, setFoundData] = useState("test");
  const studentDataCollectionRef = collection(
    db,
    `rooms/${roomID}/students_join_room`
  );

  // function evidences(id) {
  //   return navigate(`/details/${roomID}/${id}`, { replace: true });
  // }

  async function getStudentData() {
    try {
      await onSnapshot(studentDataCollectionRef, (snapshot) => {
        // console.log(snapshot.docs);
        if (snapshot.docs.length === 0) {
          setFoundData(false);
          return console.log("Data not found");
        } else {
          setStudentsData(
            snapshot.docs.map((doc) => {
              let data = doc.data();
              // console.log(data);
              setFoundData(true);
              return { id: doc.id, ...data };
            })
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // getImages();
    getStudentData();
  }, []);

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  let tScore = 0;

  return (
    <>
      {foundData ? (
        <div className="home-body mt-3">
          <Container>
            <Row className="home-main-row">
              <Col>
                <Card className="p-3">
                  <h1>Students in room</h1>
                  <Card.Body>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Student Name</th>
                          <th>Trust Score</th>
                          <th>Evidences</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentsData.map((data) => {
                          return (
                            <tr key={data.id}>
                              <td>{data.id}</td>
                              <td>{data.trust_score}</td>
                              <td>
                                <Link
                                  to={`/details/${roomID}/${data.id}`}
                                  className="btn btn-success"
                                >
                                  Evidences
                                </Link>
                              </td>
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
                  <h1>Students in room</h1>
                  <Card.Body>
                    <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>Student Name</th>
                          <th>Trust Score</th>
                          <th>Evidences</th>
                        </tr>
                      </thead>
                    </Table>
                    <h1>Students Not Found</h1>
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

export default Details;
