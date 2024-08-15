import { Card, Form, Alert, Button, Container } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { authenticateUser } from "../lib/authenticate";
import { useRouter } from 'next/router';
import Layout from '../components/layout'
export default function Login(props) {

    const [warning, setWarning] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await authenticateUser(user, password);
            router.push("/");
        } catch (err) {
            setWarning(err.message);
        }

    }

    return (
        <Layout>
            <Container style={{ flexDirection: 'column' }} className=" d-flex justify-content-center align-items-center min-vh-100">
                <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                    <Card.Body>
                        <h2>Login</h2>
                        Enter your login credentials:
                    </Card.Body>
                </Card>

                <br />
                <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group >
                            <Form.Label>User:</Form.Label>
                            <Form.Control type="text" value={user} id="userName" name="userName" onChange={e => setUser(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
                        </Form.Group  >

                        {warning && <>
                            <br />
                            <Alert variant='danger'>
                                {warning}
                            </Alert>
                        </>}

                        <br />
                        <Button variant="primary" className="pull-right" type="submit">Login</Button>
                    </Form>
                </Card>
            </Container>
        </Layout>
    );
}