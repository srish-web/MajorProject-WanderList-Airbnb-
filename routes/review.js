const express = require("express");
const router = express.Router({mergeParams: true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const listing = require("../models/listing.js")
const {isLoggedIn, validateReview, isReviewAuthor} = require("../middleware.js");

//reviews
//post route
router.post("/", isLoggedIn, validateReview, wrapAsync(async(req, res)=>{
    // console.log("params: ", req.params);
    let Listing = await listing.findById(req.params.id);
    console.log("in route");
    // console.log("body: ", req.body);
    let newReview = new Review(req.body.review);
    // console.log("listing: ", Listing);
    newReview.author = req.user._id;
    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${req.params.id}`);
}));
//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async(req, res)=>{
    console.log("in delete route");
    console.log("params: ", req.params);
    let {id, reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
}));
module.exports = router;