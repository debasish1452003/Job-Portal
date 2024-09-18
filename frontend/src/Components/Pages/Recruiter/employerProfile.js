import React, { useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Card, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import Loader from "../../layout/Loader/Loader";
import { clearErrors, loadEmployer } from "../../../Actions/userActions";
import { useNavigate } from "react-router-dom";

const EmployerProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticatedEmployer, employer } = useSelector(
    (state) => state.user
  );
  console.log(employer);

  const isDetailedEmployer = useCallback(
    (employer) => {
      return employer && employer.employer;
    },
    [employer]
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }

    if (isAuthenticatedEmployer && !isDetailedEmployer(employer)) {
      dispatch(loadEmployer());
    }
  }, [
    dispatch,
    employer,
    error,
    enqueueSnackbar,
    isAuthenticatedEmployer,
    isDetailedEmployer,
  ]);

  if (loading) return <Loader />;

  if (!employer) {
    enqueueSnackbar("Please log in to view your profile.", {
      variant: "error",
    });
    return (
      <Container className="my-5">
        <h3 className="text-center">Please log in to view your profile.</h3>
      </Container>
    );
  }

  const emp = employer && employer.employer;

  const jobsPosted = (emp && emp.jobsPosted) || [];
  const interestedUniversities = (emp && emp.interestedUniversities) || [];

  return (
    <Container
      className="my-5"
      style={{ minHeight: "100vh", marginTop: "100px" }}
    >
      <Row className="mb-4">
        <Col md={12} className="text-center mb-4 mt-8">
          <Card.Img
            src={
              employer.logo ||
              "https://i.postimg.cc/bJbpjrwD/pngimg-com-microsoft-PNG18.png"
            }
            alt="Employer Logo"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",

              margin: "0 auto",
              marginBottom: "20px",
            }}
          />
          <h1 className="mb-3">{emp && emp.companyName}</h1>
          <h4 className="mb-4 text-muted">{emp && emp.email}</h4>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={6} className="mb-4">
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">Employer Information</Card.Title>
            <p>
              <strong>Address:</strong> {emp && emp.address}
            </p>
            <p>
              <strong>Description:</strong> {(emp && emp.description) || "N/A"}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={emp && emp.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {(emp && emp.website) || "N/A"}
              </a>
            </p>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="p-3 shadow-sm">
            <Card.Title className="mb-3">
              Jobs Posted ({jobsPosted.length})
            </Card.Title>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {jobsPosted.length > 0 ? "View Jobs" : "No Jobs Posted"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {jobsPosted.length > 0 ? (
                  jobsPosted.map((job, index) => (
                    <Dropdown.Item key={index}>
                      <p>
                        <strong>Job Title:</strong> {job.title || "N/A"}
                      </p>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No jobs posted</Dropdown.Item>
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
              Interested Universities ({interestedUniversities.length})
            </Card.Title>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {interestedUniversities.length > 0
                  ? "View Interested Universities"
                  : "No Interested Universities"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {interestedUniversities.length > 0 ? (
                  interestedUniversities.map((university, index) => (
                    <Dropdown.Item key={index}>
                      <p>
                        <strong>University Name:</strong>{" "}
                        {university.name || "N/A"}
                      </p>
                      <p>
                        <strong>Location:</strong> {university.address || "N/A"}
                      </p>
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>No interested universities</Dropdown.Item>
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
          <Button variant="danger" className="me-2">
            Delete
          </Button>
          <Button variant="success" onClick={() => navigate("createJob")}>
            Create Job
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployerProfile;
