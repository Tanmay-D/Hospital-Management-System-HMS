var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
    sno: Number,
    patient: String,
    Doctor: String,
    slot: String,
    status: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);