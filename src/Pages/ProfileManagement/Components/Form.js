import React, { useState } from "react";
import { Form, Col } from 'react-bootstrap';
import SubmitButton from "../../../Components/Buttons/SubmitButton";
import StatesDropdown from "./StatesDropdown";

function ProfileManagement() {
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
                        <Form.Label className="required">Full name</Form.Label>
                        <Form.Control
                            minLength={3}
                            maxLength={50}
                            required
                            type="text"
                            placeholder="Full name"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom07">
                        <Form.Label className="required">Address 1</Form.Label>
                        <Form.Control
                            minLength={10}
                            maxLength={100}
                            required
                            type="text"
                            placeholder="1234 Main St."
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control
                            minLength={10}
                            maxLength={100}
                            type="text"
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label className="required">City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="City"
                            minLength={2}
                            maxLength={100}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label className="required">State</Form.Label>
                        <StatesDropdown />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label className="required">Zip Code</Form.Label>
                        <Form.Control
                            type="text"
                            minLength={5}
                            maxLength={9}
                            placeholder="Zip"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>

                <SubmitButton text={'Save'} />
            </Form>
        </>
    )
};

export default ProfileManagement;