import React from "react";
import { Button } from 'react-bootstrap';

function SubmitButton(props) {
    const { text } = props;
    return (
        <>
            <Button style={{ float: 'right' }} size="lg" type="submit">{text}</Button>
        </>
    )
};

export default SubmitButton;