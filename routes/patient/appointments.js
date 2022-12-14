
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
            //res.json(foundpatient);
            res.render("patients/schedule", {patient: foundpatient});
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
            var patient = req.body.patient;

            var newAppointment = {sno: sno, slot: slot, status: status, doctor: doctor, patient: patient};

            Appointment.create(newAppointment, function(err, nappointment) {
                if(err) {
                    console.log(err);
                }
                else { 
                    nappointment.save();
                    foundpatient.appointments.push(nappointment);
                    foundpatient.save();

                   console.log(foundpatient);

                    Doctor.find({doctorid: req.body.did}, function(err, foundDoc) {
                        foundDoc.appointments.push(nappointment);
                        foundDoc.save();

                        console.log({patient: foundpatient.fname + " " + foundpatient.lname, doctor: foundDoc.fname + " " + foundDoc.lname});
                    });   

                    res.redirect("/patient/");
                }
            });
        }
    });
});

// NEW ROUTE
router.get("/new", function(req, res) {
    // res.json({"msg": "Schedule a new appointment."});
    res.render("patients/new");
});


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