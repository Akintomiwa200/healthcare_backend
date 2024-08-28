
const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: String,
    birthDate: Date,
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: String,
    occupation: String,
    guardianPhoneNumber: String,
    guardianName: String,
    medicalInfo: {
        height: String,
        weight: String,
        bloodType: String,
        allergies: String,
        existingConditions: String
    },
    identification: {
        birthCertificate: String,
        idNumber: String
    },
    consent: {
        healthCondition: Boolean,
        dataUsage: Boolean,
        privacyAgreement: Boolean
    },
    hmoDetails: {
        hasHMO: Boolean,
        hmoProvider: String,
        hmoId: String
    }
});

module.exports = mongoose.model('Person', PersonSchema);
