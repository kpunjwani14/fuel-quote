import React, { useState, useEffect } from "react";
import { Form, Col } from 'react-bootstrap';
import SubmitButton from "../../../Components/Buttons/SubmitButton";
import axios from 'axios'
import Notifications, { notify } from 'react-notify-toast';
import StatesDropdown from "./StatesDropdown";
import { useHistory } from "react-router-dom";

function LoginScreen(props) {
    const [validated, setValidated] = useState(false);
    const [logForm, setLogForm] = useState({})
    let history = useHistory()
    const onLogChange = (event) => {
        setLogForm(prevState => ({ ...prevState, [event.target.name]: event.target.value }))
    }
    useEffect(async () => {
        try {

            let res = await axios.get('http://localhost:3001/auth',{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}})
            history.push('/profile')

        }
        catch (e) {
            console.log('not valid')
           
        }
    }, []
    )
    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {
            try {
                const res = await axios.post('http://localhost:3001/login', logForm);
                localStorage.setItem('token',res.data.token)
                history.push('/profile');
                notify.show('Success', 'success', 3000);
            }
            catch (e) {
                console.log('error', e);
                setValidated(true);
                notify.show('Invalid username or password', 'error', 3000);
            }
        }
        else {
            setValidated(true);
            notify.show('Missing fields', 'error', 3000);
        }
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
                            name='username'
                            onChange={onLogChange}
                            type="text"
                        />
                        <Form.Control.Feedback type="invalid">
                            Username doesn't meet requirements.
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
                            name='password'
                            onChange={onLogChange}
                            type="password"
                        />
                        <Form.Control.Feedback type="invalid">
                            Password doesn't meet requirements.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <SubmitButton text={'Login'} type={'submit'} />
            </Form>
        </>
    )
};

export default LoginScreen;