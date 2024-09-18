import React, { useEffect, Fragment, useCallback } from "react";
import { Container, Row, Col, Button, Card, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Loader from "../../layout/Loader/Loader";
import { loadUniversity, clearErrors } from "../../../Actions/userActions";

const UniversityProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { error, loading, university, isAuthenticatedUniversity } = useSelector(
    (state) => state.user
  );

  const isDetailedUniversityData = useCallback(
    (employer) => {
      return university && university.university;
    },
    [university]
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isAuthenticatedUniversity && !isDetailedUniversityData(university)) {
      console.log("Fetching detailed university data...");
      dispatch(loadUniversity());
    } else {
      console.log("Detailed university data already present:", university);
    }
  }, [
    error,
    enqueueSnackbar,
    dispatch,
    isDetailedUniversityData,
    university,
    isAuthenticatedUniversity,
  ]);

  if (!university) {
    enqueueSnackbar("Please log in to view your profile.", {
      variant: "error",
    });

    return (
      <Container className="my-5">
        <h3 className="text-center">Please log in to view your profile.</h3>
      </Container>
    );
  }

  const uni = university && university.university;

  const students = (uni && uni.students) || [];
  const employersInterested = (uni && uni.employersInterested) || [];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
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

                    margin: "0 auto",
                    marginBottom: "20px",
                  }}
                />
                <h1 className="mb-3">{uni && uni.name}</h1>
                <h4 className="mb-4 text-muted">{uni && uni.email}</h4>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col lg={6} className="mb-4">
                <Card className="p-3 shadow-sm">
                  <Card.Title className="mb-3">
                    University Information
                  </Card.Title>
                  <p>
                    <strong>Address:</strong> {uni && uni.address}
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    {(uni && uni.description) || "N/A"}
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href={uni && uni.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {(uni && uni.website) || "N/A"}
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
                              <strong>Name:</strong>{" "}
                              {student.firstName + " " + student.lastName ||
                                "N/A"}
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
                              <strong>Company Name:</strong>{" "}
                              {employer.name || "N/A"}
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
        </>
      )}
    </Fragment>
  );
};

export default UniversityProfile;
