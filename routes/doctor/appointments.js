
var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Patient     = require("../../models/patient"),
    Doctor      = require("../../models/doctor"),
    Appointment = require("../../models/appointment");


// ROUTES



// 2. "/appointments" => doctor appointment schedule
router.get("/", function(req, res) {
    Doctor.findById(req.user._id, function(err, foundDoc) {
        if(err) {
            console.log(err);
        }
        else {
            // res.render("doctors/schedule", {doc: foundDoc});
            res.json(foundDoc);

            Appointment.find({doctor: foundDoc.name}, function(err, apmnts) {
                //res.render("", {appointments: apmnts});
                res.json(apmnts);
            });

        }
    });
});

// 3. "/prescriptions" => Not yet decided

// 4. "/appointments/delete" => Delete Appointment 
router.delete("/:id", function(req, res) {
    Appointment.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            // res.render("doctors/schedule");
            res.json({"msg": "Appointment cancelled!"});
        }
    });
});

// 5. "/appointments/approve" => Update status of appointment

// EDIT ROUTE
// router.get("/appointments/:id/approve", function(req, res) {
//     Appointment.findById(req.params.id, function(err, foundAppointment) {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.render("items/edit", {list_id: req.params.id, foundAppointment});
//         }
//     });
// });


// // UPDATE ROUTE
// router.put("/:item_id", middleware.isLoggedIn, function(req, res) {
//     Item.findByIdAndUpdate(req.params.item_id, req.body.item, function(err, updatedItem) {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             res.redirect("/lists/" + req.params.id);
//         }
//     });
// });

module.exports = router;