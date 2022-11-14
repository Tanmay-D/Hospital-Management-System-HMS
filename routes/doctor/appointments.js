
var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Patient     = require("../../models/patient"),
    Doctor      = require("../../models/doctor"),
    Appointment = require("../../models/appointment");


// 2. "/appointments" => doctor appointment schedule
router.get("/", function(req, res) {
    Doctor.findById(req.user._id, function(err, foundDoc) {
        if(err) {
            console.log(err);
        }
        else {
            //res.json(foundDoc);
                var name = foundDoc.fname + " " + foundDoc.lname;
                Appointment.find({doctor: name}, function(err, apmnts) {
                   //res.json(apmnts);
                    res.render("doctors/schedule", {appointments: apmnts});
                });
                
                //res.json(apmnts);
        }
    });
});


// 4. "/appointments/delete" => Delete Appointment 
router.get("/:id", function(req, res) {
    Appointment.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/doctor");
            //res.json({"msg": "Appointment cancelled!"});
        }
    });
});


module.exports = router;