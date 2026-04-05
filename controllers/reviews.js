const listing = require("../models/listing");
const review = require("../models/review");

module.exports.createReview = async(req, res)=>{
    // console.log("params: ", req.params);
    let Listing = await listing.findById(req.params.id);
    console.log("in route");
    // console.log("body: ", req.body);
    let newReview = new review(req.body.review);
    // console.log("listing: ", Listing);
    newReview.author = req.user._id;
    Listing.reviews.push(newReview);
    await newReview.save();
    await Listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${req.params.id}`);
}

module.exports.deleteReview = async(req, res)=>{
    console.log("in delete route");
    console.log("params: ", req.params);
    let {id, reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
}