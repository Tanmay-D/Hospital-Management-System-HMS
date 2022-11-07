var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var receptionistSchema = new mongoose.Schema({
    // fname: String,
    // lname: String,
    name: String,
    contact: String,
    username: String,
    receptionistid: String,
    password: String,
    appointments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        }
    ]
});

receptionistSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Receptionist", receptionistSchema);