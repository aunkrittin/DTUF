import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import firebaseConfig from "../config";
import { getFirestore } from "@firebase/firestore";

const db = getFirestore(firebaseConfig);

function Results() {
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
      setRoomName(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getRoomName();
  }, [roomsNameCollectionRef]);

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
                      <h3>Room Name: {data.room_name}</h3>
                      <h3>Room ID: {data.id}</h3>
                      <h3>Link: {data.gformLink}</h3>
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
