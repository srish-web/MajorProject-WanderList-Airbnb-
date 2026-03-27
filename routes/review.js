const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { listingSchema, reviewSchema} = require("../schema.js");
const listing = require("../models/listing.js")

const validateReview = (req, res, next)=>{
    console.log(req.body);
    let {error} = reviewSchema.validate(req.body);
    console.log(error);
    if(error){
        // console.log("in if")
        let errmsg = error.details.map((el)=>el.message).join(",");
        throw new expressError(400, errmsg);
    }else{
        // console.log("in else");
        next();
    }
};

//reviews
//post route
router.post("/", validateReview, wrapAsync(async(req, res)=>{
    // console.log("params: ", req.params);
    let Listing = await listing.findById(req.params.id);
    console.log("in route");
    // console.log("body: ", req.body);
    let newReview = new Review(req.body.review);
    // console.log("listing: ", Listing);
    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    res.redirect(`/listings/${req.params.id}`);
}));
//delete review route
router.delete("/:reviewId", wrapAsync(async(req, res)=>{
    console.log("in delete route");
    console.log("params: ", req.params);
    let {id, reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));
module.exports = router;