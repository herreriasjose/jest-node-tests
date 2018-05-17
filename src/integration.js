//  tdd-jest-node/src/integration.js
    
const express = require('express');
const app = express();


// The port and the database table will be defined by environment variables, 
// so we can deploy unit tests, integration, etc. on different ports.

const port = process.env.API_PORT || 3000;

const table = process.env.DB_TABLE || "products";

const sqlite3 = require('sqlite3').verbose();

// For the sake of brevity, let's use a table for testing tasks instead a complete dedicate database.

const productsDBPath =  './databases/products.db';

var adminRouter = express.Router();

// Here we will return a summary with all the products of the database in json format.

adminRouter.get('/',function(req,res){                        

  let db = new sqlite3.Database(productsDBPath, (err) => {
    if (err) {
      console.log("Error: ",err.message);
      return;
    }
      var query = `SELECT productId,description, price FROM ${table};`;       

    db.all(query, (err, rows) => {
        if(err) {
          console.log("Error:", err);
          return;
        };  

        // res.json(JSON.stringify(rows));
        res.send("Mumble mumble...")
  });
});

});


// A simple greeting message.

app.get('/',function (req, res) {
    res.send('Welcome to Bug-Based Delicacies!')
    })


app.use('/products',adminRouter);

app.listen(port, function(){
        console.log('App started on port',port);
})