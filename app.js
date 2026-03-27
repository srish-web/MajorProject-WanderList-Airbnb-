const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");

const listings = require("./routes/listing.js");
const Reviews = require("./routes/review.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

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


app.use("/listings", listings);
app.use("/listings/:id/reviews", Reviews);

//test route
// app.get("/testList", async (req, res)=>{
//     let sample = new listing({
//         title: "My Villa",
//         descreption: "By the beatch",
//         price: 1200,
//         location: "xyz",
//         country: "india",
//     })
//     await sample.save();
//     res.send("successful");
// });
// Put this near the end, before your error-handling middleware
app.all('{*any}', (req, res, next) => {
    const err = new expressError(404, 'Page Not Found');
    err.statusCode = 404;
    next(err);        // ← forwards to your error handler
});

//middleware to handle error
app.use((err, req, res ,next)=>{
    console.log(err);
    let {statusCode=500, message="catched the error"} = err;
    res.status(statusCode).render("error.ejs", { message });
});

// app.all('/secret', (err, req, res, next) => {
//     message = "404 Page Not Found";
//     res.render("error.ejs", {message});
// })


app.listen(8080, ()=>{
    console.log("server is listening....");
});