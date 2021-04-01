import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Navigation(props) {
    let { id } = useParams()

    return (
        <>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="./">Fuel Quote</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href={id ? ("/history/" + id) : '/'}>Quote History</Nav.Link>
                    <Nav.Link href={id ? ("/profile/" + id) : '/'}>Profile Management</Nav.Link>
                    <Nav.Link href={id ? ("/request-quote/" + id) : '/'}>Request a Quote</Nav.Link>
                </Nav>
                {!id && <Nav>
                    <Nav.Link href="/">Logout</Nav.Link>
                </Nav>}
            </Navbar>
        </>
    )
};

export default Navigation;