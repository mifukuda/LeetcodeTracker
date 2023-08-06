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
const puppeteer = require('puppeteer');

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

app.get('/test', async (req, res) => {
	// Start a Puppeteer session with:
	// - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
	// - no default viewport (`defaultViewport: null` - website page will in full width and height)
	const browser = await puppeteer.launch({
		//headless: true,
		defaultViewport: null,
	});
	
	// Open a new page
	const page = await browser.newPage();
	
	// On this new page:
	// - open the "http://quotes.toscrape.com/" website
	// - wait until the dom content is loaded (HTML is ready)
	await page.goto("http://quotes.toscrape.com/", {
		waitUntil: "domcontentloaded",
	});
	
	// Get page data
	const quotes = await page.evaluate(() => {
		// Fetch the first element with class "quote"
		const quote = document.querySelector(".quote");
	
		// Fetch the sub-elements from the previously fetched quote element
		// Get the displayed text and return it (`.innerText`)
		const text = quote.querySelector(".text").innerText;
		const author = quote.querySelector(".author").innerText;
	
		return { text, author };
	});
	
	// Display the quotes
	console.log(quotes);
	
	// Close the browser
	await browser.close();
});
 
app.listen(process.env.PORT || 4000, () => {
	console.log('Web Server is listening at port ' + (process.env.PORT || 4000));
});