import React, { useState } from "react";
import { Form, Col } from 'react-bootstrap';
import RegisterButton from "../../../Components/Buttons/RegisterButton";

function LoginScreen() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(form);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label className="required">Username</Form.Label>
                        <Form.Control
                            minLength={3}
                            maxLength={50}
                            required
                            type="text"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid username.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom07">
                        <Form.Label className="required">Password</Form.Label>
                        <Form.Control
                            minLength={10}
                            maxLength={100}
                            required
                            type="text"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom07">
                        <Form.Label className="required">Confirm Password</Form.Label>
                        <Form.Control
                            minLength={10}
                            maxLength={100}
                            required
                            type="text"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please ensure the passwords match.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <RegisterButton text={'Register'} type={'submit'} />
            </Form>
        </>
    )
};

export default LoginScreen;