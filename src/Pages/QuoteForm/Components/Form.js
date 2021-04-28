import React, { useEffect, useState } from "react";
import { Form, Col, Button } from 'react-bootstrap';
import SubmitButton from '../../../Components/Buttons/SubmitButton';
import Notifications, { notify } from 'react-notify-toast';
import DatePicker from 'react-date-picker';
import {useHistory} from 'react-router-dom'
import axios from 'axios'

function ProfileManagement() {
    const [validated, setValidated] = useState(false);
    const [isLoading,setLoading] = useState(true)
    const history = useHistory()
    const [gallons, setGallons] = useState(1);
    const [date, setDate] = useState(new Date());
    const [pricePerGallon,setPricePerGallon] = useState(5);
    const [total, setTotal] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [addressData,setAddressData] = useState({address:'',city:'',state:'',zipcode:''})

    const increment = () => setGallons(gallons + 1);
    const decrement = () => {
        if (gallons > 1) {
            setGallons(gallons - 1);
        }
    }

    const handleSubmit = async (event) => {
       try{
        axios.post('http://localhost:3001/submitQuotes',{Gallons:gallons,SuggestedPrice:pricePerGallon,DeliveryDate:date,TotalPrice:total},{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}})
        notify.show('Quote Saved','success',3000)
       }
       catch(e){
        console.log(e)
       }
    }

    const handleClick = async () => {
        if (date) {
            
            try{
                let calculations = await axios.get(`http://localhost:3001/getPrice?gallonsRequested=${gallons}`,{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}})
                setPricePerGallon(calculations.data.suggestedPricePerGallon)
                setTotal(calculations.data.totalAmountDue)
                setIsClicked(true);
            }
            catch(err){
                console.log(err)
            }
        } else {
            setIsClicked(false);
        }
    }
    useEffect(async () => {
        try {

            let res = await axios.get('http://localhost:3001/profile',{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}})

            if(!res.data.address)
                history.push('/profile')
            setAddressData(res.data)
            setLoading(false)
            

        }
        catch (e) {
            console.log('not valid')
            history.push('/profile')

        }
    }, []
    )

    return (
        <>
            {!isLoading&&
            <Form noValidate validated={validated} >
                <Form.Row>
                    <Form.Group as={Col} md="5">
                        <Form.Label className="required">Gallons requested</Form.Label>
                        {/* <div>
                            <Button onClick={decrement} variant="primary">-</Button>{' '}
                            <h5 style={{ display: "inline", padding: "5px" }}>{gallons}</h5>
                            <Button onClick={increment} variant="primary">+</Button>{' '}
                        </div> */}
                        <Form.Control type='number' min={1} value={gallons} onChange={e=>setGallons(e.target.value)}/>


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
                        <Form.Control type="text" placeholder="123 Main St." value={addressData.address} readOnly />
                    </Form.Group>
                    <Form.Group as={Col} md="3">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Houston" value ={addressData.city} readOnly />
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="TX" value ={addressData.state} readOnly />
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" placeholder="77047" value ={addressData.zipcode} readOnly />
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
                        <Button onClick={handleSubmit} disabled={!date ? true : false} size="lg" style={{ float: "right" }}>Submit Quote</Button>
                    </div>
                }
            </Form>}
        </>
    )
};

export default ProfileManagement;