/*
	Partially from CSE 316 Top 5 Lister Project:

    "This is our application's top-level component.
    
    @author McKilla Gorilla"
*/


const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

// Setup middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const appRouter = require('./routes/index');
app.use('/api', appRouter)

// Setup database connection
const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 
app.get('/', (req, res) => {
	res.send("Hello");
});

app.get('/test', (req, res) => {
    res.send("Hello");
});
 
app.listen(process.env.PORT || 4000, () => {
	console.log('Web Server is listening at port ' + (process.env.PORT || 4000));
});