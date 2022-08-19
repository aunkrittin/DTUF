import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col, Table, Button } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import firebaseConfig from "../config";
import { getFirestore } from "@firebase/firestore";

const db = getFirestore(firebaseConfig);

function Detail() {
  const { handle } = useParams();
  const roomID = handle;
  let navigate = useNavigate();
  const [studentsData, setStudentsData] = useState([]);
  const studentDataCollectionRef = collection(
    db,
    `rooms/${roomID}/students_join_room`
  );

  async function getStudentData() {
    const data = await getDocs(
      collection(db, `rooms/${roomID}/students_join_room`)
    );
    console.log(roomID);

    // const data = await getDocs(
    //   query(
    //     studentDataCollectionRef,
    //     where("action", "==", `join_room`),
    //     orderBy("timestamp", "asc")
    //   )
    // );

    setStudentsData(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  }

  useEffect(() => {
    getStudentData();
  }, []);

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
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
                    </tr>
                  </thead>
                  <tbody>
                    {studentsData.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.id}</td>
                          <td>
                            <Button className="btn btn-success">Result</Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Detail;
