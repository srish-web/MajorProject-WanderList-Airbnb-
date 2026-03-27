const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const ReviewRouter = require("./routes/review.js");
const UserRouter = require("./routes/user.js");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
    secret: "anysecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};
app.get("/", (req, res)=>{
    res.send("Root setup completed");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    console.log(res.locals.success);
    next();
});

// app.get("/demouser", async(req, res)=>{
//     let fakeUser = new User({
//         email: "user1@gmail.com",
//         username: "user-1",
//     });
//     let registeredUser = await User.register(fakeUser, "passwordUser-1");
//     res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", ReviewRouter);
app.use("/", UserRouter);

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