var express  = require("express"),
    router   = express.Router(),
    Patient  = require("../../models/patient"),
    Doctor   = require("../../models/doctor"),
    passport = require("passport");


router.get("/", function(req, res) {
    res.render("patients/patientdash");
    //res.json({"msg" : "welcome!"})
    console.log(req.user);
});
    

// SHOW ALL DOCTORS
router.get("/doctors", function(req, res) {
    // Doctor.find({}, function(err, docs){
    //     res.render("patients/doctorlist", {doctors: docs});
    // });
    res.render("patients/doctorlist");
});


// SIGN-UP FORM
router.get("/register", function(req, res) {
    res.render("patients/signup");
    console.log("signup page.");
    
});


// Handle Sign Up Logic
router.post("/register", function(req, res) {

    var newPatient = new Patient({
        username: req.body.username,
        //name: req.body.name,
        fname:  req.body.fname,
        lname:  req.body.lname,
        contact:  req.body.contact,
        contactF:  req.body.contactF,
        // patientid:  req.body.patientid,
    });

    Patient.register(newPatient, req.body.password, function(err, patient) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(patient);
            res.redirect("/patient/login");
        }
    });
});


//LOGIN FORM
router.get("/login", function(req, res) {
    res.render("patients/login");
    // res.json({"msg": "Login Route..."});
});


// Handle Login Logic
router.post("/login", passport.authenticate("patientLocal", 
    {
        successRedirect: "/patient/",
        failureRedirect: "/patient/login"
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