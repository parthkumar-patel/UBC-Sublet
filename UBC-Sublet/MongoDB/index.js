const express = require("express");
const mongoose = require("mongoose");
const Sublets = require("./models/sublets");
const axios = require('axios');

require("dotenv").config();


const app = express();
// app.use(cors());

app.use(express.json());

const port = 3001;
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(uri, {
    useUnifiedTopology: true,
})
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfuly");
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
});

const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCk4iCG3RB70rBv2uIdPfepGnuRMs17e6U' // Replace with your actual Google Maps API key
});
app.get('/search', (req, res) => {
    const address = req.query.q; // Assuming the address is passed as a query parameter

    // Perform the geocoding
    googleMapsClient.geocode({ address: address }, (err, response) => {
        if (!err) {
            const result = response.json.results[0];
            if (result) {
                const location = result.geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;
                res.json({ latitude, longitude });
            } else {
                res.status(404).json({ error: 'Address not found' });
            }
        } else {
            console.error('Geocoding error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});


// const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`;

// const apiKey = 'AIzaSyCk4iCG3RB70rBv2uIdPfepGnuRMs17e6U'; // Replace 'YOUR_API_KEY' with your actual API key
// app.get('/search', async (req, res) => {
//     try {
//         const query = req.query.q;
//         if (!query) {
//             throw new Error('Missing search query');
//         }
        
//         const url = `https://maps.googleapis.com/maps/api/place/details/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}`;
//         const response = await fetch(url);
//         const predictions = response.data;
//         // Do something with the coordinates (e.g., set to state)
//         // console.log('Coordinates:', { lat, lng });

//         const data = await response.json(); 
//         console.log(data);   
//         res.json(data);
//     } catch (error) {
//         console.error(req.query);
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal k error' });
//     }
// });

        

app.get("/subletslist", async (req, res) => {
    try {
        const sublets = await Sublets.find({});

        res.json(sublets);    
    } catch (err) {
        console.error("Error fetching sublets:", err);
        res.status(500).send("Error fetching sublets");
    }
});

app.post("/sublets", async(req, res) => {
    try {
        console.log("req.body: ", req.body);
        const sublets = new Sublets(req.body); // Create a new Sublets object directly from req.body

        await sublets.save(); // Save the sublets object to the database
        res.send("Sublet added"); // Send a success response 
    } catch(err) {
        console.log("error catched: ", err);
    }
})

app.listen(port, () => {
    console.log(`app is listening at http://localhost:${port}`);
});


