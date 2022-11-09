var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
    sno: Number,
    pid: String,
    did: String,
    slot: String,
    status: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);