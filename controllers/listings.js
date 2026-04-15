const listing = require("../models/listing");
module.exports.index = async (req, res)=>{
    const allListings = await listing.find({});
    res.render("listings/index.ejs", {allListings});
};

module.exports.createNew = (req, res)=>{
    res.render("listings/new.ejs");
}

module.exports.SaveListing = async (req, res, next)=>{
    // let listing = req.body.listing;
    // console.log(listing);
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
    
}

module.exports.showListing = async (req, res)=>{
    let {id} = req.params;
    const data = await listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        },
    }).populate("owner");
    if(data===null){
        req.flash("error", "Listing does not exist!");
        console.log("redirecting");
        res.redirect("/listings");
    }else{
        res.render("listings/show.ejs", {data});
    }
    
}

module.exports.EditForm = async (req, res)=>{
    // console.log("in the edit route.");
    let {id} = req.params;
    const data = await listing.findById(id);
    if(data===null){
        req.flash("error", "Listing does not exist!");
        console.log("redirecting");
        res.redirect("/listings");
    }else{
        res.render("listings/edit.ejs", {data});
    }
    
}

module.exports.updateListing = async (req, res)=>{
    let {id} = req.params;
    let updatedlisting = await listing.findByIdAndUpdate(id,  {...req.body.listing});

    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedlisting.image = { url, filename };
        await updatedlisting.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req, res)=>{
    let {id} = req.params;
    let deletedListing = await listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect(`/listings`);
}