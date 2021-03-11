const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());

// change stuff here to make it connect to your localhost db 
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    host: 'localhost',
    password: '00000000',
    database: 'sys',
});

app.post('/create', (req, res) => {
    const gallons_requested = req.body.gallons_requested;
    const delivery_address = req.body.delivery_address;
    const delivery_date = req.body.delivery_date;
    const suggested_price = req.body.suggested_price;
    const total_price = req.body.total_price;

    db.query(
        'INSERT INTO sys.quote_history (gallons_requested, delivery_address, delivery_date, suggested_price, total_price) VALUES (?,?,?,?,?)' 
        [gallons_requested, delivery_address, delivery_date, suggested_price, total_price],
        (err, result) => {
            if (err){
                console.log(err);
            } else{
                res.send("values inserted");
            }
        }
    );
});

app.get("/showtable", (req, res) => {
    db.query("SELECT * FROM sys.quote_history", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result);
      }
    });
  });

app.listen(3001, () =>{
    console.log("works on 3001!");
});