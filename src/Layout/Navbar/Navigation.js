import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';

function Navigation() {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="./">Fuel Quote</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="./">Quote History</Nav.Link>
                    <Nav.Link href="./profile">Profile Management</Nav.Link>
                    <Nav.Link href="./request-quote">Request a Quote</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="./login">Login</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
};

export default Navigation;