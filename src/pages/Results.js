import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col, Table, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import {
  collection,
  orderBy,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import firebaseConfig from "../config";
import { getFirestore } from "@firebase/firestore";

import Swal from "sweetalert2";

const db = getFirestore(firebaseConfig);

function Results() {
  let navigate = useNavigate();
  const [roomsData, setRoomsData] = useState([]);
  const roomsNameCollectionRef = collection(db, "rooms");
  const [roomsFound, setRoomsFound] = useState("test");

  function details(id) {
    return navigate(`/details/${id}`, { replace: true });
  }

  async function getRoomData() {
    const data = await query(
      roomsNameCollectionRef,
      where("user_id", "==", `${currentUser.uid}`),
      orderBy("timestamp", "desc")
    );
    // console.log(data);

    onSnapshot(data, (snapshot) => {
      setRoomsData(
        snapshot.docs.map((doc) => {
          let data = doc.data();
          console.log(data);
          return { id: doc.id, ...data };
        })
      );
    });
    setRoomsFound(true);
  }

  useEffect(() => {
    getRoomData();
  }, []);

  function onDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your room has been deleted.",
            "success"
          );
          const db = firebaseConfig.firestore();
          db.collection("rooms").doc(id).delete();
          // return navigate("/results", { replace: true });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your room is safe :)",
            "error"
          );
        }
      });
  }

  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {roomsFound ? (
        <div className="home-body mt-3">
          <Container>
            <Row className="home-main-row">
              <Col>
                <Card className="p-3">
                  <h1>Rooms</h1>
                  <Card.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Room Name</th>
                          <th>Room ID</th>
                          <th>Time (minutes)</th>
                          <th>Created At</th>
                          <th>Link</th>
                          <th>Details</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roomsData.map((data) => {
                          // console.log(data.timestamp);
                          const date = data.timestamp.toDate().toDateString();
                          return (
                            <tr key={data.id}>
                              <td>{data.room_name}</td>
                              <td>{data.id}</td>
                              <td>{data.timeDuration}</td>
                              <td>{date}</td>
                              <td>
                                <Button
                                  onClick={() =>
                                    navigate(`/student/${data.id}`, {
                                      replace: true,
                                    })
                                  }
                                  style={{ textDecoration: "none" }}
                                >
                                  Join Room
                                </Button>
                              </td>
                              <td>
                                <Button
                                  onClick={() => details(data.id)}
                                  className="btn btn-success"
                                >
                                  Details
                                </Button>
                              </td>
                              <td>
                                <Button
                                  variant="danger"
                                  onClick={() => onDelete(data.id)}
                                >
                                  Delete Room
                                </Button>
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
      ) : (
        <div className="home-body mt-3">
          <Container>
            <Row className="home-main-row">
              <Col>
                <Card className="p-3">
                  <h1>Rooms</h1>
                  <Card.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Room Name</th>
                          <th>Room ID</th>
                          <th>Time (minutes)</th>
                          <th>Created At</th>
                          <th>Link</th>
                          <th>Details</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                    </Table>
                    <h1>Rooms not found</h1>
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

export default Results;
