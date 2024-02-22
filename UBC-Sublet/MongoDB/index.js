const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://rythem:rp99@cluster0.e53yyxx.mongodb.net/houses?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected To MongoDB");
})
.catch((err) => {
    console.log(err);
})