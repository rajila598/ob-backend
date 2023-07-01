const express = require('express');
const connectDB = require('./database/Database');
const cors = require('cors');
const cloudinary = require('cloudinary');
const multipart = require('connect-multiparty');

// Dotenv Config
require("dotenv").config();
const app = express();

// express json
app.use(express.json());
app.use(multipart())

// cors config
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

app.use(cors(corsOptions));

//set view engine
app.set('view engine','ejs');
app.use(express.urlencoded({ extended: true }));

//  create a route
app.get('/', (req, res) => {
    res.send('Welcome to API');
});

// middleware for user controller
app.use('/api/user', require('./controllers/userControllers'));
// middleware for product controller
app.use('/api/product', require('./controllers/productController'));
//middleware for order controller
app.use('/api/orders', require('./controllers/orderController'));


// connect to database
connectDB();

// listen to the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});



