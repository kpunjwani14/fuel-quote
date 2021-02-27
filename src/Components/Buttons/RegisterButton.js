import React from "react";
import { Button } from 'react-bootstrap';

function RegisterButton(props) {
    const { text, type } = props;
    return (
        <>
            <Button style={{ float: 'right' }} size="lg" type={type}>{text}</Button>
        </>
    )
};

export default RegisterButton;