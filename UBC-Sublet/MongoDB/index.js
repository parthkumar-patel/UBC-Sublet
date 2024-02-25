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
app.get("/subletslist", async (req, res) => {
    try {
        const result = await Sublets.find({});
        const base64Images = result.map(sublet => sublet.rooms);
        res.status(200).json({ base64Images })
        console.log("Sublet from db: ", result);
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


