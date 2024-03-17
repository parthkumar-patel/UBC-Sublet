import { Button, Form, Row, Col } from "react-bootstrap";
import "./styles/createProfile.css";

export default function CreateProfile() {
  return (
    <div className="create-profile-container">
      <Form className="create-profile-form mt-5">
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control required type="text" placeholder="Enter first name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control required type="text" placeholder="Enter last name" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustom05">
          <Form.Label>Contact Number (Optional)</Form.Label>
          <Form.Control type="text" placeholder="Enter contact number" />
          <Form.Control.Feedback type="invalid">
            Please provide a valid phone number.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="px-5">
          Create Profile
        </Button>
      </Form>
    </div>
  );
}
