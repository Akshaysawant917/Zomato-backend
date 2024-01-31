// Import express & router
const express = require("express");
const router = express.Router();

// Import Controllers
const restaurantController = require("../Controllers62/restaurant").getAllRestaurants;
const restaurantByLocationController = require("../Controllers62/restaurant").getAllRestaurantsByLocation;
const restaurantByLocationIdController = require("../Controllers62/restaurant").getAllRestaurantsByLocationId;
const restaurantByRestaurantIdController = require("../Controllers62/restaurant").getAllRestaurantsByRestaurantId;
const restaurantByFilterController = require("../Controllers62/restaurant").getRestaurantsByFilters;
const locationController = require("../Controllers62/locations").getAllLocations;
const mealTypesController = require("../Controllers62/mealtypes").getAllMealTypes;
const loginController = require("../Controllers62/users").login;
const signupController = require("../Controllers62/users").signup;

// Define API end points
router.get('/getAllRestaurants', restaurantController);
router.get('/getRestaurantsByLocation/:cityName', restaurantByLocationController);
router.get('/getRestaurantsByLocationId/:locationtId', restaurantByLocationIdController);
router.get('/getRestaurantByRestaurantId/:RestaurantId', restaurantByRestaurantIdController);
router.post("/getRestaurantsByFilters", restaurantByFilterController);   
router.get('/getAllLocations', locationController);
router.get('/getAllMealTypes', mealTypesController);
router.post('/login', loginController);
router.post('/signup', signupController);

// Export router
module.exports = router;
