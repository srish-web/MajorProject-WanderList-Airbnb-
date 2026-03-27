const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema} = require("../schema.js");
const expressError = require("../utils/expressError.js");
const listing = require("../models/listing.js")

const validateListing = (req, res, next)=>{
    console.log(req.body);
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
        throw new expressError(400, errmsg);
    }else{
        next();
    }
};

//index route
router.get("/", wrapAsync(async (req, res)=>{
    const allListings = await listing.find({});
    res.render("listings/index.ejs", {allListings});
        // .then(res =>{
        //     console.log(res);
        // });
}));

//create new route
router.get("/new", (req, res)=>{
    res.render("listings/new.ejs");
});

router.post("/", validateListing, wrapAsync(async (req, res)=>{
    // let listing = req.body.listing;
    // console.log(listing);
    
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    
}));

//show
router.get("/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    const data = await listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {data});
}));

//update route
//step1:get request->edit route
router.get("/:id/edit", async (req, res)=>{
    console.log("in the edit route.");
    let {id} = req.params;
    const data = await listing.findById(id);
    res.render("listings/edit.ejs", {data});
});

//step2:put request
router.put("/:id", validateListing, wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));
//delete route
router.delete("/:id", async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect(`/listings`);
});

module.exports = router;