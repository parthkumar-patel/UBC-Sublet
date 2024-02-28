const express = require("express");
const mongoose = require("mongoose");
const Sublets = require("./models/sublets");
require("dotenv").config();


const app = express();
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


