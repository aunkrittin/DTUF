import React, { useContext, useEffect, useState } from "react";
import { Container, Card, Row, Col, Table, Button } from "react-bootstrap";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import firebaseConfig from "../config";
import { getFirestore } from "@firebase/firestore";
import Swal from "sweetalert2";

const db = getFirestore(firebaseConfig);

function Results() {
  let navigate = useNavigate();
  // const roomID = props.roomID;
  const [studentsData, setStudentsData] = useState([]);
  const roomsNameCollectionRef = collection(db, "rooms/");

  async function getStudentData() {
    const data = await getDocs(
      query(
        roomsNameCollectionRef,
        where("user_id", "==", `${currentUser.uid}`),
        orderBy("timestamp", "desc")
      )
    );
    // console.log(data);
    setStudentsData(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  }

  useEffect(() => {
    getStudentData();
  }, [getStudentData]);

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
    <div className="home-body mt-3">
      <Container>
        <Row className="home-main-row">
          <Col>
            <Card className="p-3">
              <h1>Students in room</h1>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Room Name</th>
                      <th>Room ID</th>
                      <th>Time(minutes)</th>
                      <th>Link</th>
                      <th>Details</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsData.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.room_name}</td>
                          <td>{data.id}</td>
                          <td>{data.timeDuration}</td>
                          <td>
                            <Link
                              to={`/student/${data.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              Join Room
                            </Link>
                          </td>
                          <td>
                            <Button className="btn btn-success">Details</Button>
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
  );
}

export default Results;
