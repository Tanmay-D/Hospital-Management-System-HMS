var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var doctorSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    contact: String,
    username: String,
    doctorid: String,
    password: String,
    appointments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        }
    ]
});

doctorSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Doctor", doctorSchema);