const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({

    name : String,
    restaurant_id : Number,
    city : String,
    city_id : Number,
    locality : String,
    location_id : Number,
    address : String,
    image : String,
    rating : Number,
    min_price : Number,
    contact : Number,
    cuisine : [{cuisine_id : Number, name : String}],
    mealtype_id : [{id : Number, name : String}],

});

module.exports = mongoose.model("restaurants", restaurantSchema, "restaurants");





