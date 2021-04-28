import React from "react";
import Navigation from "../../Layout/Navbar/Navigation";
import Table from 'react-bootstrap/Table';
import { useState,useEffect } from "react";
import axios from 'axios';
import { NavDropdown } from "react-bootstrap";
import { useParams, useHistory } from 'react-router-dom'

// commenting this out for now until we can get the db info to present nicely in the table

// function QuoteHistory() {
//     return (
//         <>
//             <Navigation />
//             <h1>Quote History (Also the homepage)</h1>
//             <div class="row">
//                 <div class="col-sm-4">
//                     <h3></h3>
//                 </div>
//             </div>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                     <th>Quote ID</th>
//                     <th>Gallons Requested</th>
//                     <th>Delivery Address</th>
//                     <th>Delivery Date</th>
//                     <th>Suggested Price Per Gallon</th>
//                     <th>Total Amount Due</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                     <td>1001</td>
//                     <td>100</td>
//                     <td>123 Any Street CITY, STATE, ZIP</td>
//                     <td>02/22/2021</td>
//                     <td>$.$$</td>
//                     <td>$$</td>
//                     </tr>
//                     <tr>
//                     <td>1002</td>
//                     <td>1000</td>
//                     <td>123 Any Street CITY, STATE, ZIP</td>
//                     <td>02/23/2021</td>
//                     <td>$.$$</td>
//                     <td>$$</td>
//                     </tr>
//                     <tr>
//                     <td>1003</td>
//                     <td>10000</td>
//                     <td>123 Any Street CITY, STATE, ZIP</td>
//                     <td>02/24/2021</td>
//                     <td>$.$$</td>
//                     <td>$$</td>
//                     </tr>
//                 </tbody>
//             </Table>
//         </>
//     )
// };

// temporary quotehistory function 

function QuoteHistory() {
  let { id } = useParams()
  let history = useHistory()
  // const [gallons_requested, setGallons] = useState(0);
  // const [delivery_address, setAddress] = useState("");
  // const [delivery_date, setDate] = useState("");
  // const [suggested_price, setSuggested_price] = useState(0);
  // const [total_price, setTotal_price] = useState(0);

  const [tableInfo, setTableInfo] = useState([]);

   useEffect( ()=>{
    axios.get("http://localhost:3001/showTable",{headers:{"Authorization":`Bearer ${localStorage.getItem('token')}`}}).then((response) => {
      setTableInfo(response.data);
    }).catch(e => history.push('/'));
  },[]);


  return (
    <>
    <Navigation />
    <div className="App">
      <div className="table">
        {/* <button onClick={getTable}>Show Table Info</button> */}
        {tableInfo.map((val, key) => {
          
          return (
            <>
              <div key={key} className="quotes">
                <div>
                  <h3>Gallons: {val.Gallons}</h3>
                  <h3>Address: {val.DeliveryAddress}</h3>
                  <h3>Date: {new Date(val.DeliveryDate).toDateString()}</h3>
                  <h3>Suggested Price: {val.SuggestedPrice}</h3>
                  <h3>Total Price: {val.TotalPrice}</h3>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
    </>
  );


}

export default QuoteHistory;