import React from "react";
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function Navigation(props) {
    let { id } = useParams()
    let history = useHistory()
    return (
        <>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="./">Fuel Quote</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href={"/history"}>Quote History</Nav.Link>
                    <Nav.Link href={"/profile"}>Profile Management</Nav.Link>
                    <Nav.Link href={"/request-quote"}>Request a Quote</Nav.Link>
                </Nav>
                {/* {!id && <Nav>
                    <Nav.Link href="/">Login</Nav.Link>
                </Nav>} */}
                {<Nav>
                    <Nav.Link onClick={()=>{localStorage.setItem('token','');history.push('/')}}>Logout</Nav.Link>
                </Nav>}
            </Navbar>
        </>
    )
};

export default Navigation;