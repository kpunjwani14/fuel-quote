import React from "react";
import { Card } from 'react-bootstrap';
import Form from './Form';

function CardForm() {
    return (
        <>
            <Card>
                <Card.Header>
                    <svg style={{ paddingBottom: "5px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                    </svg>
                    <h5 style={{ display: "inline", paddingLeft: "5px" }}>Fuel Quote Request</h5>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Please fill out the following information to get a quote.
                     </Card.Text>
                    <Form />
                </Card.Body>
            </Card>
        </>
    )
};

export default CardForm;