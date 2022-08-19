import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import firebaseConfig from "../config";
import { getFirestore, limit } from "@firebase/firestore";

const db = getFirestore(firebaseConfig);

function Results() {
  // const roomID = props.roomID;
  const [roomsName, setRoomName] = useState([]);
  const roomsNameCollectionRef = collection(db, "rooms");

  useEffect(() => {
    const getRoomName = async () => {
      const data = await getDocs(
        query(
          roomsNameCollectionRef,
          where("user_id", "==", `${currentUser.uid}`),
          orderBy("timestamp", "desc")
        )
      );
      console.log(data);
      setRoomName(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getRoomName();
  }, []);

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-body mt-5">
      <Container>
        <Row className="home-main-row">
          <Col>
            <Card className="p-5">
              <Card.Body>
                {roomsName.map((data) => {
                  return (
                    <div key={data.id}>
                      <h3 style={{ color: "red" }}>
                        Room Name: {data.room_name}
                      </h3>
                      <h4 style={{ color: "green" }}>Room ID: {data.id}</h4>
                      <h4 style={{ color: "hotpink" }}>
                        Time: {data.timeDuration} Minutes
                      </h4>
                      <h4>
                        <a
                          style={{ textDecoration: "none" }}
                          href={`http://localhost:3000/student/${data.id}`}
                        >
                          Join Room
                        </a>
                        {/* <Link to={`/student/${data.id}`}>Room Link</Link> */}
                      </h4>
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Results;
