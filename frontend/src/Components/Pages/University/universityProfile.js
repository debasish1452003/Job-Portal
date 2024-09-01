import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Loader from "../../layout/Loader/Loader";
// import { loadUniversity } from "../../../Actions/userActions";

const UniversityProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);

  const university = useSelector((state) => state.user.university);

  if (!university) {
    enqueueSnackbar("Please log in to view your profile.", {
      variant: "error",
    });

    if (loading) return <Loader />;

    return (
      <Container className="my-5">
        <h3 className="text-center">Please log in to view your profile.</h3>
      </Container>
    );
  }

  const students = university.students || [];
  const employersInterested = university.employersInterested || [];

  return (
    <Container
      className="my-5"
      style={{ minHeight: "100vh", marginTop: "100px" }}
    >
      <Row className="mb-4">
        <Col md={12} className="text-center mb-4 mt-8">
          <Card.Img
            src={
              university.logo ||
              "https://i.postimg.cc/L6YYhf1H/pngkey-com-nimbus-2000-png-2840253.png"
            }
            alt="University Logo"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
              borderRadius: "50%",
              margin: "0 auto",
              marginBottom: "20px",
            }}
          />
          <h1 className="mb-3">{university.name}</h1>
          <h4 className="mb-4 text-muted">{university.email}</h4>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6} className="mb-4">
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">University Information</Card.Title>
            <p>
              <strong>Address:</strong> {university.address}
            </p>
            <p>
              <strong>Description:</strong> {university.description || "N/A"}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {university.website || "N/A"}
              </a>
            </p>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">
              Associated Students ({students.length})
            </Card.Title>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {students.length > 0 ? "View Students" : "No Students"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <Dropdown.Item key={index}>
                      <p>
                        <strong>Name:</strong> {student.name || "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong> {student.email || "N/A"}
                      </p>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No associated students</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={12} className="mb-4">
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">
              Interested Employers ({employersInterested.length})
            </Card.Title>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {employersInterested.length > 0
                  ? "View Interested Employers"
                  : "No Interested Employers"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {employersInterested.length > 0 ? (
                  employersInterested.map((employer, index) => (
                    <Dropdown.Item key={index}>
                      <p>
                        <strong>Company Name:</strong> {employer.name || "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong> {employer.email || "N/A"}
                      </p>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No interested employers</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12} className="text-center">
          <Button variant="primary" className="me-2">
            Edit
          </Button>
          <Button variant="danger">Delete</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UniversityProfile;
