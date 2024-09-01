import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Loader from "../../layout/Loader/Loader";

const fetchUniversityName = (universityId) => {
  const universities = {
    "66d0b5714323dbf15577faea": "NIT Rourkela",
  };
  return universities[universityId] || "Unknown University";
};

const StudentProfile = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Access student data from Redux state
  const student = useSelector((state) => state.user.student.student);
  const loading = useSelector((state) => state.user.loading);

  if (loading) return <Loader />;

  // Check if student data exists
  if (!student) {
    enqueueSnackbar("Please log in to view your profile.", {
      variant: "error",
    });
    return (
      <Container className="my-5">
        <h3 className="text-center">Please log in to view your profile.</h3>
      </Container>
    );
  }

  // Initialize appliedJobs and recommendedJobs as empty arrays if undefined
  const appliedJobs = student.appliedJobs || [];
  const recommendedJobs = student.recommendedJobs || [];

  return (
    <Container
      className="my-5"
      style={{ minHeight: "100vh", marginTop: "100px" }}
    >
      <Row className="mb-4 mt-6">
        <Col md={12} className="text-center mb-4 mt-8">
          <Card.Img
            src={"https://i.postimg.cc/RFDc5M6M/user-2.png"}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              margin: "0 auto",
              marginBottom: "20px",
            }}
          />
          <h1 className="mb-3">
            {student.firstName} {student.lastName}
          </h1>
          <h4 className="mb-4 text-muted">{student.email}</h4>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6} className="mb-4">
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">Student Information</Card.Title>
            <p>
              <strong>Degree:</strong> {student.degree}
            </p>
            <p>
              <strong>Major:</strong> {student.major}
            </p>
            <p>
              <strong>Graduation Year:</strong> {student.graduationYear}
            </p>
            <p>
              <strong>Skills:</strong> {student.skills}
            </p>
            <p>
              <strong>Resume:</strong> {student.resume}
            </p>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="p-3 shadow-sm flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                src="https://i.postimg.cc/dt6c0qgw/pngkey-com-nimbus-2000-png-2840253.png"
                alt="University Logo"
                className="object-contain"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            </div>
            <div className="flex-grow">
              <Card.Title className="text-xl font-semibold mb-3">
                NIT ROURKELA
              </Card.Title>
              <p>
                <strong>Location:</strong> Sector-1, Rourkela, Odisha, India
              </p>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6} className="mb-4">
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">
              Applied Jobs ({appliedJobs.length})
            </Card.Title>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {appliedJobs.length > 0
                  ? "View Applied Jobs"
                  : "No Applied Jobs"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {appliedJobs.length > 0 ? (
                  appliedJobs.map((job, index) => (
                    <Dropdown.Item key={index}>
                      <p>
                        <strong>Job Title:</strong> {job.title}
                      </p>
                      <p>
                        <strong>Company:</strong> {job.companyName}
                      </p>
                      <p>
                        <strong>Status:</strong> {job.status}
                      </p>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No applied jobs</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">
              Recommended Jobs ({recommendedJobs.length})
            </Card.Title>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {recommendedJobs.length > 0
                  ? "View Recommendations"
                  : "No Recommendations"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {recommendedJobs.length > 0 ? (
                  recommendedJobs.map((job, index) => (
                    <Dropdown.Item key={index}>
                      <p>
                        <strong>Job Title:</strong> {job.title}
                      </p>
                      <p>
                        <strong>Company:</strong> {job.companyName}
                      </p>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No recommended jobs</Dropdown.Item>
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

export default StudentProfile;
