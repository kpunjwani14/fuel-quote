import React, { useState } from "react";
import { Form, Col, Button } from 'react-bootstrap';
import SubmitButton from '../../../Components/Buttons/SubmitButton';
import DatePicker from 'react-date-picker';

function ProfileManagement() {
    const [validated, setValidated] = useState(false);

    const [gallons, setGallons] = useState(1);
    const [date, setDate] = useState(new Date());
    const [pricePerGallon] = useState(5);
    const [total, setTotal] = useState(pricePerGallon * gallons);
    const [isClicked, setIsClicked] = useState(false);

    const increment = () => setGallons(gallons + 1);
    const decrement = () => {
        if (gallons > 1) {
            setGallons(gallons - 1);
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(form);
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    }

    const handleClick = () => {
        if (date) {
            setIsClicked(true);
            setTotal(pricePerGallon * gallons);
        } else {
            setIsClicked(false);
        }
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="5">
                        <Form.Label className="required">Gallons requested</Form.Label>
                        <div>
                            <Button onClick={decrement} variant="primary">-</Button>{' '}
                            <h5 style={{ display: "inline", padding: "5px" }}>{gallons}</h5>
                            <Button onClick={increment} variant="primary">+</Button>{' '}
                        </div>
                    </Form.Group>

                    <Form.Group as={Col} md="2">
                        <Form.Label className="required">Delivery date</Form.Label>
                        <DatePicker required value={date} onChange={setDate} minDate={new Date()} />
                    </Form.Group>

                </Form.Row>
                <br />

                <Form.Row>
                    <Form.Group as={Col} md="5">
                        <Form.Label>Delivery Address</Form.Label>
                        <Form.Control type="text" placeholder="123 Main St." readOnly />
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Houston" readOnly />
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="TX" readOnly />
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" placeholder="77047" readOnly />
                    </Form.Group>
                </Form.Row>
                <Button disabled={!date ? true : false} size="lg" style={{ float: "right" }} onClick={handleClick}>Get New Quote</Button>

                <br />
                <br />
                <br />

                {isClicked &&
                    <div className="header" style={{ textAlign: 'right' }}>
                        <h5>{`Suggested Price per Gallon: $${pricePerGallon.toFixed(2)}`}</h5>
                        <h5>{`Total Amount Due: $${total.toFixed(2)}`}</h5>
                    </div>
                }
            </Form>
        </>
    )
};

export default ProfileManagement;