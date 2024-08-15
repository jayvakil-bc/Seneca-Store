import { Card, Form, Alert, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from "../lib/authenticate";
import Layout from "../components/layout"
export default function Signup() {

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await registerUser(user, password, password2, fullName, role);
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <Layout>

      <Container style={{ flexDirection: 'column' }} className=" d-flex justify-content-center align-items-center min-vh-100">
        <h1>
          <Card bg="light" className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Body>
              <h2 className="text-center">SignUp / Create your account - </h2>
              
            </Card.Body>
          </Card>
        </h1>

        <Card className="shadow-lg p-3 mb-5 bg-white rounded">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} placeholder="Enter your username" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type="password" id="password2" name="password2" onChange={e => setPassword2(e.target.value)} placeholder="Confirm password" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control type="text" value={fullName} id="fullName" name="fullName" onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role:</Form.Label>
                <Form.Control type="text" value={role} id="role" name="role" onChange={e => setRole(e.target.value)} placeholder="Enter your role" />
              </Form.Group>
              {warning && (
                <Alert variant='danger'>
                  {warning}
                </Alert>
              )}
              <Button variant="primary" className="text-center" type="submit">SignUp</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}
