const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    doctor: { type: String, required: true },
    reason: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
