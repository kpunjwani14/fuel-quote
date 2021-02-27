import React from "react";
import Navigation from "../../Layout/Navbar/Navigation";
import Table from 'react-bootstrap/Table'

function QuoteHistory() {
    return (
        <>
            <Navigation />
            <h1>Quote History (Also the homepage)</h1>
            <div class="row">
                <div class="col-sm-4">
                    <h3></h3>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Quote ID</th>
                    <th>Gallons Requested</th>
                    <th>Delivery Address</th>
                    <th>Delivery Date</th>
                    <th>Suggested Price Per Gallon</th>
                    <th>Total Amount Due</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1001</td>
                    <td>100</td>
                    <td>123 Any Street CITY, STATE, ZIP</td>
                    <td>02/22/2021</td>
                    <td>$.$$</td>
                    <td>$$</td>
                    </tr>
                    <tr>
                    <td>1002</td>
                    <td>1000</td>
                    <td>123 Any Street CITY, STATE, ZIP</td>
                    <td>02/23/2021</td>
                    <td>$.$$</td>
                    <td>$$</td>
                    </tr>
                    <tr>
                    <td>1003</td>
                    <td>10000</td>
                    <td>123 Any Street CITY, STATE, ZIP</td>
                    <td>02/24/2021</td>
                    <td>$.$$</td>
                    <td>$$</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
};

export default QuoteHistory;