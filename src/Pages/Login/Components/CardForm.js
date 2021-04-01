import { React, useState } from "react";
import { Card, Tabs, Tab } from 'react-bootstrap';
import Form from "./Form";
import FormR from "./register_Form"

function CardForm() {
    const [key, setKey] = useState('login');

    return (
        <>
            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="login" title="Login">
                    <Card>
                        <Card.Header>
                            <svg style={{ paddingBottom: "5px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                            <h5 style={{ display: "inline", paddingLeft: "5px" }}>Login Screen</h5>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Please enter your username and password to log in to your account.
                     </Card.Text>
                            <Form />
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="register" title="Register">
                    <Card>
                        <Card.Header>
                            <svg style={{ paddingBottom: "5px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                            <h5 style={{ display: "inline", paddingLeft: "5px" }}>Create A New Account</h5>
                        </Card.Header>
                        <Card.Body>
                            Register here if you do not have an existing account. Then proceed to complete your profile.
                    <div class="row"><div class="col-sm-4"><h3></h3></div></div>
                            <FormR />
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
        </>
    )
};

export default CardForm;