var express  = require("express"),
    router   = express.Router(),
    Doctor   = require("../../models/doctor"),
    passport = require("passport");


router.get("/", function(req, res) {
    res.render("doctors/docdash");
    //res.json({"msg" : "welcome!"})
});
    


// SIGN-UP FORM
router.get("/register", function(req, res) {
    res.render("doctors/signup");
    //console.log("signup page.");
    
});


// Handle Sign Up Logic
router.post("/register", function(req, res) {

    var newDoctor = new Doctor({
        username: req.body.username,
        //name: req.body.name
        fname:  req.body.fname,
        lname:  req.body.lname,
        contact:  req.body.contact,
        doctorid:  req.body.doctorid,
    });

    Doctor.register(newDoctor, req.body.password, function(err, doc) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/doctor/login");
        }
    });
});


//LOGIN FORM
router.get("/login", function(req, res) {
    res.render("doctors/login");
    // res.json({"msg": "Login Route..."});
});


// Handle Login Logic
router.post("/login", passport.authenticate("doctorLocal", 
    {
        successRedirect: "/doctor",
        failureRedirect: "/doctor/login"
    }
    ), function(req, res) {
});


// Logout Logic
router.get("/logout", function(req, res) {
    req.logout(function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/");
        }
    });
});


module.exports = router;