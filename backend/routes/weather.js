const router = require('express').Router();
const axios = require('axios');

router.route('/retrieve').post(async (req, res) => {
    try {
        // Define the address data
        const address = req.body["postAddress"];
        const addressString = address.replace(/[ ,]/g, "+") + "&benchmark=2020&format=json";

        // Step 1: Fetch data from the first Geocoder API
        const geocodingData = await axios.get(`https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${addressString}`);
        
        const geocodingDataCoordinates = geocodingData.data["result"]["addressMatches"][0]["coordinates"];

        const latitude = geocodingDataCoordinates["y"];
        const longitude = geocodingDataCoordinates["x"];

        try {
            // Retrieve GridX, GridY, and Forecast Office details
            const gridData = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`);

            const gridX = gridData.data["properties"]["gridX"];
            const gridY = gridData.data["properties"]["gridY"];
            const forecastOfficeURL = gridData.data["properties"]["forecastOffice"];
            const forecastOffice = forecastOfficeURL.substring(forecastOfficeURL.length - 3);

            console.log(gridX, gridY, forecastOffice);
            
            // API call to retrieve forecast
            const forecastData = await axios.get(`https://api.weather.gov/gridpoints/${forecastOffice}/${gridX},${gridY}/forecast`);

            res.json({ success: true, data: forecastData.data });
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;