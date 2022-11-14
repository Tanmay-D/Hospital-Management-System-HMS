var express  = require("express"),
    router   = express.Router(),
    Nurse  = require("../../models/nurse"),
    passport = require("passport");


router.get("/", function(req, res) {
    res.render("nurses/nursedash");
});
    


// SIGN-UP FORM
router.get("/register", function(req, res) {
    res.render("nurses/signup");
    console.log("signup page.");
    
});


// Handle Sign Up Logic
router.post("/register", function(req, res) {

    var newNurse = new Nurse({
        username: req.body.username,
        fname:  req.body.fname,
        lname:  req.body.lname,
        contact:  req.body.contact,
        nurseid:  req.body.nurseid,
    });

    Nurse.register(newNurse, req.body.password, function(err, nurse) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/nurse/login");
        }
    });
});


//LOGIN FORM
router.get("/login", function(req, res) {
    res.render("nurses/login");
    // res.json({"msg": "Login Route..."});
});


// Handle Login Logic
router.post("/login", passport.authenticate("nurseLocal", 
    {
        successRedirect: "/nurse/",
        failureRedirect: "/nurse/login"
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