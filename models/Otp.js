const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '10m' }
});

module.exports = mongoose.model('Otp', otpSchema);
