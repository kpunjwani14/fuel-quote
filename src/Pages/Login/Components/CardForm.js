import { React, useState } from "react";
import { Card, Tabs, Tab } from 'react-bootstrap';
import Form from "./Form";
import FormR from "./register_Form";
import styled from "styled-components";

const LoginLogout = styled.div`
    width: 45%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

function CardForm() {
    const [key, setKey] = useState('login');

    return (
        <>
            <LoginLogout>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab
                        eventKey="login"
                        title={<span><svg style={{ paddingBottom: "5px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg> Login</span>}
                    >
                        <Card>
                            <Card.Body>
                                <Card.Text>
                                    Please enter your username and password to log in to your account.
                                </Card.Text>
                                <Form />
                            </Card.Body>
                        </Card>
                    </Tab>
                    <Tab
                        eventKey="register"
                        title={<span><svg style={{ paddingBottom: "5px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg> Register</span>}
                    >
                        <Card>
                            <Card.Body>
                                Register here if you do not have an existing account. Then proceed to complete your profile.
                                <br /><br />
                                <FormR />
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>
            </LoginLogout>
        </>
    )
};

export default CardForm;