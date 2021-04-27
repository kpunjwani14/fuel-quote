import React, { useState } from "react";
import { Form, Col } from 'react-bootstrap';
import RegisterButton from "../../../Components/Buttons/RegisterButton";
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

function LoginScreen(props) {
    const [validated, setValidated] = useState(false);
    const [formRegister, setForm] = useState({})
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            notify.show('Missing fields', 'error', 3000);
        }
        else {
            try {
                const res = await axios.post('http://localhost:3001/register', formRegister);
                notify.show('Success', 'success', 3000);
            }
            catch (err) {
                console.log(err);
                notify.show('Failed to create account', 'error', 3000);
            }
        }
        setValidated(true);
    }
    const onInputChange = (event) => {
        const { target } = event
        setForm(prevState => ({ ...prevState, [target.name]: target.value }))
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
                            name='RegisterUsername'
                            onChange={onInputChange}
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
                            type="password"
                            name='RegisterPassword'
                            onChange={onInputChange}
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
                            type="password"
                            name='confirm'
                            onChange={onInputChange}
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