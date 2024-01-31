// const express = require ("express");
const _ = require("underscore");

const RestaurantData = require ("../Models62/restaurant-data");

// const app = express();
// app.get("/getAllRestaurants", (req, res) => {
//     res.send(restaurantData);
// });
exports.getAllRestaurants = async (req, res) => {
    let restaurantData = await RestaurantData.find();                                   //added after replacing JSON data with MongoDB
    try{
        res.status(200).json({
            message : "All restaurants fetched successfully",
            restaurants : restaurantData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};

// app.get("/getRestaurantsByLocation/:cityName", (req,res) => {
//     let filteredData = _.where(restaurantData, {city: req.params.cityName});
//     res.send(filteredData);
// });
exports.getAllRestaurantsByLocation = async (req, res) => {
    let restaurantData = await RestaurantData.find();                                   //added after replacing JSON data with MongoDB
    try{
        let filteredData = _.where(restaurantData, {city: req.params.cityName});
        res.status(200).json({
            message : `Restaurants in ${req.params.cityName} city fetched successfully`,
            restaurants : filteredData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};
exports.getAllRestaurantsByLocationId = async (req, res) => {
    let restaurantData = await RestaurantData.find();                                   //added after replacing JSON data with MongoDB
    try{
        // let filteredData = _.where(restaurantData, {location_id:parseInt(req.params.locationId)
        let filteredData = restaurantData.filter((restaurant) => restaurant.location_id === parseInt(req.params.locationtId));
// });
        res.status(200).json({
            message : `Restaurants in location id ${req.params.locationId} fetched successfully`,
            restaurants : filteredData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};
exports.getAllRestaurantsByRestaurantId = async (req, res) => {
    let restaurantData = await RestaurantData.findById(req.params.RestaurantId);                               
    //added after replacing JSON data with MongoDB
    try{
        // let filteredData = _.where(restaurantData, {location_id:parseInt(req.params.locationId)
        // let filteredData = restaurantData.filter((restaurant) => restaurant._id === parseInt(req.params.restaurantId));
// });
        res.status(200).json({
            message : `Restaurant id ${req.params.restaurantId} fetched successfully`,
            restaurants : restaurantData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};

exports.getRestaurantsByFilters = async (req, res) => {
                                       //added after replacing JSON data with MongoDB
    try {
        const {mealType, location, cuisine, lowCost, highCost, sort, page} = req.body;

        let filteredData;

        //filter by cuisine
        if(cuisine){
            filteredData = await RestaurantData.find({
                cuisine :{$elemMatch : {id : cuisine}}
            });
        }
        else{
            filteredData = await RestaurantData.find();
        }
  
        // Filter by meal type
        if (mealType) {
            filteredData = filteredData.filter((restaurant) => restaurant.mealtype_id.some((a)=>a.id  === parseInt(mealType)));
        }
  
        // Filter by location
        if (location) {
            filteredData = filteredData.filter((restaurant) => restaurant.location_id === parseInt(location));
        }
  
        // Filter by cuisine
        // if (cuisine  && cuisine.length > 0) {
        //     filteredData = filteredData.filter((restaurant) => restaurant.cuisine.some((c) => c.id === cuisine.map((i)=>i)));
        // }
        // if (cuisine && cuisine.length > 0) {
        //     filteredData = filteredData.filter((restaurant) =>
        //         restaurant.cuisine.some((c) => cuisine.includes(c.id))
        //     );
        // }
  
        // Filter by cost range
        if (lowCost && highCost) {
            filteredData = filteredData.filter((restaurant) => restaurant.min_price > parseInt(lowCost) && restaurant.min_price < parseInt(highCost));
        }
  
        // Sort by rating
        // if (sort === 1) {
        //     filteredData.sort((a, b) => a.rating - b.rating);
        // }
        // if (sort === -1) {
        //     filteredData.sort((a, b) => b.rating - a.rating);
        // }
        // sort by min price
        if (sort === 1) {
            filteredData.sort((a, b) => a.min_price - b.min_price);
        }
        if (sort === -1) {
            filteredData.sort((a, b) => b.min_price - a.min_price);
        }
  
        // Pagination
        const pageSize = 2; // Number of restaurants per page
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        const pageCount = Math.ceil(filteredData.length / 2);
        
  
        res.status(200).json({
            message: "Restaurants fetched successfully with filters",
            restaurants: paginatedData,
           
            
        });
    } 
    catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
};
  