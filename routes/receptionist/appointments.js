var express = require("express"),
router      = express.Router({mergeParams: true}),
Appointment = require("../../models/appointment"),
Patient     = require("../../models/patient"),
Doctor      = require("../../models/doctor"),
middleware  = require("../../middleware");


router.get("/", function(req, res){
    Appointment.find({}, function(err, appmsnts) {
        res.json(appmsnts);
        //res.render(filename, {apmnts: appmsnts});
    });
});

module.exports = router;