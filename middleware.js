const listing = require("./models/listing.js");
const expressError = require("./utils/expressError.js");
const { listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please Login!!");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl  = req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner = async (req, res, next)=>{
    let {id} = req.params;
    let toUpdatelisting = await listing.findById(id);
    if(!toUpdatelisting.owner._id.equals(req.user._id)){
        req.flash("error", "Permission Restricted");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async (req, res, next)=>{
    let {id, reviewId} = req.params;
    let toUpdateReview = await Review.findById(reviewId);
    if(!toUpdateReview.author._id.equals(req.user._id)){
        req.flash("error", "Permission Restricted");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.validateListing = (req, res, next)=>{
    console.log(req.body);
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
        throw new expressError(400, errmsg);
    }else{
        next();
    }
};
module.exports.validateReview = (req, res, next)=>{
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