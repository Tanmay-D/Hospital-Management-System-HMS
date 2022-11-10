var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var nurseSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    contact: String,
    email: String,
    nurseid: String,
    password: String
});

nurseSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Nurse", nurseSchema);