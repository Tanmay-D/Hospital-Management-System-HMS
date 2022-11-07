var mongoose = require("mongoose");

var nurseSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    contact: String,
    email: String,
    nurseid: String,
    password: String
});

module.exports = mongoose.model("Nurse", nurseSchema);