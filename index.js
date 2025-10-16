const express = require('express');
const dotenv = require('dotenv');
const { connect } = require('./src/utils/database.js');
const routerProducts = require('./src/api/routes/product.routes.js');
const routerUsers = require('./src/api/routes/user.routes.js');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 5500;
const app = express();
connect();

const allowedOrigins = [
    'https://dressmeup-frontend.web.app',
    'http://localhost:5173',
    'http://localhost:4200/'
];

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    // origin: '*',
    origin: allowedOrigins,
    credentials: true
}))

app.use('/users', routerUsers);
app.use('/products', routerProducts);

app.use('*', (req, res) => {
    console.log(req);
    res.status(404).json('Route not found');
})

app.listen(PORT, () => console.log(`Listening on : Http://localhost:${PORT}`));