
var express = require("express"),
router      = express.Router({mergeParams: true}),
Appointment = require("../../models/appointment"),
Patient     = require("../../models/patient"),
Doctor      = require("../../models/doctor"),
middleware  = require("../../middleware");


//INDEX ROUTE    
router.get("/", function(req, res) {
    Patient.findById(req.user._id).populate("appointments").exec(function(err, foundpatient) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(req.user);
            res.json(foundpatient);
            // res.render("lists/index", {user: founduser});
        }
    });
});


// CREATE ROUTE
router.post("/", function(req, res) {
    Patient.findById((req.user._id), function(err, foundpatient) {
        if(err) {
            console.log(err);
        }
        else {
            console.log(foundpatient);
            var sno = req.body.sno;
            var slot = req.body.slot;
            var status = req.body.status;
            var doctor = req.body.doctor;

            var newAppointment = {sno: sno, slot: slot, status: status, doctor: doctor};

            Appointment.create(newAppointment, function(err, appointment) {
                if(err) {
                    console.log(err);
                }
                else { 
                    appointment.save();
                    foundpatient.appointments.push(appointment);
                    foundpatient.save();

                   console.log(foundpatient);

                    Doctor.findOne({name: doctor}, function(err, foundDoc) {
                        foundDoc.appointments.push(appointment);
                        foundDoc.save();

                        res.json(foundDoc);
                    });   

                    // res.redirect("/lists");
                }
            });
        }
    });
});


// NEW ROUTE
router.get("/new", function(req, res) {
    // res.json({"msg": "Schedule a new appointment."});
    res.render("patients/new");
// res.render("lists/new");
});


// SHOW ROUTE
// router.get("/:id", function(req, res) {
// List.findById(req.params.id).populate("items").exec(function(err, foundList) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         res.render("lists/show", {list: foundList});
//     }
// });
// });


// DELETE ROUTE
router.delete("/:id", function(req, res) {
List.findByIdAndDelete(req.params.id, function(err) {
    if(err) {
        console.log(err);
    }
    else {
        res.json({"msg": "Appointment cancelled!"});
        // res.redirect("/lists");
    }
});
});


module.exports = router;