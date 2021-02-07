import React from "react";
import { Card } from 'react-bootstrap';
import Form from "./Form";

function CardForm() {
    return (
        <>
            <Card>
                <Card.Header>
                    <svg style={{ paddingBottom: "5px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <h5 style={{ display: "inline", paddingLeft: "5px" }}>Profile Management</h5>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Please complete your profile to proceed.
                     </Card.Text>
                    <Form />
                </Card.Body>
            </Card>
        </>
    )
};

export default CardForm;