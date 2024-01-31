//Day 62
// Import express & router
const express = require("express");
const mongoose = require('mongoose');
const cors= require("cors");
const router = require('./routes62/index');
require('dotenv').config();

// Create express app & define port
const app = express();
const PORT = process.env.PORT || 8030;


// Middleware to handle json data
app.use(cors());
app.use(express.json());

// Handling CORS
// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-type', 'Authorization');
//     next();
// })

// Navigate all req to router
app.use('/', router);

//Connecting to MongoDB cloud instance
mongoose.connect(
    `mongodb+srv://Akshaysawant9177:${encodeURIComponent(process.env.REACT_APP_MONGO_KEY)}@cluster0.ktbjuw7.mongodb.net/zomato`,
  
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(success => {
    console.log('Connected to MongoDB');
    // Starting the server on port
    app.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`Restaurants app listening on localhost:${PORT}`);
    });
}).catch(error =>{
    console.log('Error in connection ' + error);
});


