import React, { useState } from "react";
import { Form, Col } from 'react-bootstrap';
import SubmitButton from "../../../Components/Buttons/SubmitButton";
import StatesDropdown from "./StatesDropdown";

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
                            Please provide a valid name.
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
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <SubmitButton text={'Login'} type={'submit'} />
            </Form>
        </>
    )
};

export default LoginScreen;