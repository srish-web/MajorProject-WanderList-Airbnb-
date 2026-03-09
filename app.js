const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js")

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderList');
}
main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch((err)=>{
        console.log(err);
    });

app.get("/", (req, res)=>{
    res.send("Root setup completed");
});

app.get("/testList", async (req, res)=>{
    let sample = new listing({
        title: "My Villa",
        descreption: "By the beatch",
        price: 1200,
        location: "xyz",
        country: "india",
    })
    await sample.save();
    res.send("successful");
});



app.listen(8080, ()=>{
    console.log("server is listening....");
});