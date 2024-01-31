// const express = require ("express");

const LocationData = require ("../Models62/locations-data");

// const app = express();
// app.get("/getAllLocations", (req, res) => {
//     res.send(locationData);
// });
exports.getAllLocations = async (req, res) => {
    let locationData = await LocationData.find();                                   //added after replacing JSON data with MongoDB
    try{
        res.status(200).json({
            message : "All locations fetched successfully",
            locations : locationData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};