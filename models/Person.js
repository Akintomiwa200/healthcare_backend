const mongoose = require("mongoose");

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
  doctor: String,
  medicalInfo: {
    height: String,
    weight: String,
    bloodType: String,
    allergies: String,
    existingConditions: String,
  },
  identification: {
    birthCertificate: String,
    idNumber: String,
  },
  consent: {
    healthCondition: Boolean,
    dataUsage: Boolean,
    privacyAgreement: Boolean,
  },

  otp: {
    code: String,
    expiresAt: { type: Date, default: Date.now, index: { expires: "10m" } },
  },
});

module.exports = mongoose.model("Person", PersonSchema);
