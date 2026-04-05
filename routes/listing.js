const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const lisitngController = require("../controllers/listings.js");

//index route
router
    .route("/")
    .get(wrapAsync(lisitngController.index))
    .post(
        isLoggedIn, 
        validateListing, 
        wrapAsync(lisitngController.SaveListing
    ));


//create new route
router.get("/new",isLoggedIn, lisitngController.createNew);

//show
router
    .route("/:id")
    .get(wrapAsync(lisitngController.showListing))
    .put(
        isLoggedIn, 
        isOwner, 
        validateListing, 
        wrapAsync(lisitngController.updateListing

    ));

//update route
//step1:get request->edit route
router.get("/:id/edit", isLoggedIn, isOwner, lisitngController.EditForm);

//step2:put request
router;
//delete route
router.delete("/:id", isLoggedIn, isOwner, lisitngController.deleteListing);

module.exports = router;