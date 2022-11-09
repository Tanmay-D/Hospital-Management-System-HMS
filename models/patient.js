var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var patientSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    contact: String,
    contactF: String,
    username: String,
    password: String,
    appointments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        }
    ]
});

patientSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Patient", patientSchema);