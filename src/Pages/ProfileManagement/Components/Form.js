import React, { useEffect, useState } from "react";
import { Form, Col } from 'react-bootstrap';
import SubmitButton from "../../../Components/Buttons/SubmitButton";
import StatesDropdown from "./StatesDropdown"
import axios from 'axios'
import {useParams,useHistory,Redirect} from 'react-router-dom'


function ProfileManagement() {
    const [isValid,setValid] = useState(true)
    let {id} = useParams()
    useEffect(async () => {
        try {
            let res = await axios.get('http://localhost:3001/profile/'+id)
            setFormData(res.data)
          
        }
        catch (e) {
            console.log('not valid')
            setValid(false)
        }
    },[]
    )
    const [validated, setValidated] = useState(false);
    const [formData,setFormData] = useState({name:null,state:null,address:null,address2:null,city:null,zipcode:null})
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        
        if (form.checkValidity() === true) {
            console.log(formData)
            axios.post('http://localhost:3001/profile/'+id,formData)
        }
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
    }
    const onProfileChange=(event)=>{
        const {name,value} = event.target
        setFormData(prevState=>({...prevState,[name]:value}))
        
    }

    return (
       !isValid?<Redirect to='/'/>:
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
                            name="name"
                            value={formData.name}
                            onChange={onProfileChange}
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
                            name='address'
                            onChange={onProfileChange}
                            value={formData.address}
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
                            onChange={onProfileChange}
                            name='address2'
                            value={formData.address2}
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
                            name='city'
                            onChange={onProfileChange}
                            maxLength={100}
                            required
                            value={formData.city}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label className="required">State</Form.Label>
                        <StatesDropdown formData={formData.state} onChange={onProfileChange}  />
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
                            name='zipcode'
                            onChange={onProfileChange}
                            value={formData.zipcode}
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