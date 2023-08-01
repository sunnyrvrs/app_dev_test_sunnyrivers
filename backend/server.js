const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const weatherRouter = require('./routes/weather');

app.use(cors());
// Setup body-parser to parse JSON bodies
app.use(bodyParser.json());
// Setup body-parser to parse URL-encoded form bodies
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/getWeather', weatherRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})