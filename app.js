const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");


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

//index route
app.get("/listings", wrapAsync(async (req, res)=>{
    const allListings = await listing.find({});
    res.render("listings/index.ejs", {allListings});
        // .then(res =>{
        //     console.log(res);
        // });
}));

//create new route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
});

app.post("/listings", wrapAsync(async (req, res)=>{
    // let listing = req.body.listing;
    // console.log(listing);
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    
}));

//show
app.get("/listings/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    const data = await listing.findById(id);
    res.render("listings/show.ejs", {data});
}));

//update route
//step1:get request->edit route
app.get("/listings/:id/edit", async (req, res)=>{
    console.log("in the edit route.");
    let {id} = req.params;
    const data = await listing.findById(id);
    res.render("listings/edit.ejs", {data});
});

//step2:put request
app.put("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});
//delete route
app.delete("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect(`/listings`);
});

// Put this near the end, before your error-handling middleware
app.all('{*any}', (req, res, next) => {
    const err = new expressError(404, 'Page Not Found');
    err.statusCode = 404;
    next(err);        // ← forwards to your error handler
});

//middleware to handle error
app.use((err, req, res ,next)=>{
    let {statusCode=500, message="catched the error"} = err;
    res.status(404).render("error.ejs", { message });
});

// app.all('/secret', (err, req, res, next) => {
//     message = "404 Page Not Found";
//     res.render("error.ejs", {message});
// })


app.listen(8080, ()=>{
    console.log("server is listening....");
});