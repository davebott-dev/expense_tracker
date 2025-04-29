require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const apiRoute = require('./routes/api');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Server is running on port ${port}`); });