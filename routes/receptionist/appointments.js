var express = require("express"),
router      = express.Router({mergeParams: true}),
Appointment = require("../../models/appointment"),
Patient     = require("../../models/patient"),
Doctor      = require("../../models/doctor"),
middleware  = require("../../middleware");


router.get("/", function(req, res){
    Appointment.find({}, function(err, appmsnts) {
        //res.json(appmsnts);
        res.render("receptionists/admin", {appointments: appmsnts});
    });
});


router.get("/:id", function(req, res) {
    Appointment.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/receptionist");
        }
    });
});

module.exports = router;