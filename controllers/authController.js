const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Person = require("../models/Person");
const config = require("../config");
// Joi schema for validation
const personValidationSchema = Joi.object({
  fullName: Joi.string().required(),
  gender: Joi.string().optional(),
  birthDate: Joi.date().optional(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  address: Joi.string().optional(),
  occupation: Joi.string().optional(),
  guardianPhoneNumber: Joi.string().optional(),
  guardianName: Joi.string().optional(),
  medicalInfo: Joi.object({
    height: Joi.string().optional(),
    weight: Joi.string().optional(),
    bloodType: Joi.string().optional(),
    allergies: Joi.string().optional(),
    existingConditions: Joi.string().optional(),
  }).optional(),
  identification: Joi.object({
    birthCertificate: Joi.string().optional(),
    idNumber: Joi.string().optional(),
  }).optional(),
  consent: Joi.object({
    healthCondition: Joi.boolean().optional(),
    dataUsage: Joi.boolean().optional(),
    privacyAgreement: Joi.boolean().optional(),
  }).optional(),
  hmoDetails: Joi.object({
    hasHMO: Joi.boolean().optional(),
    hmoProvider: Joi.string().optional(),
    hmoId: Joi.string().optional(),
  }).optional(),
});

module.exports.signup = async function (req, res) {
  try {
    // Validate request body with Joi
    const { error, value } = personValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the user already exists
    const existingPerson = await Person.findOne({ email: value.email });
    if (existingPerson) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Create a new Person with validated data
    const newPerson = new Person(value);

    // Save the new user
    await newPerson.save();

    res.status(201).json({
      message: "User created successfully.",
      person: newPerson,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res
      .status(500)
      .json({ error: "An error occurred during the signup process." });
  }
};

module.exports.login = async function (req, res) {
  try {
    const { fullname, email, phonenumber } = req.body;

    // Find the user by email
    const person = await Person.findOne({ email });
    if (!person) {
      return res.status(404).json({ error: "User not found." });
    }

    // Validate fullname and phone number
    if (person.fullname !== fullname || person.phonenumber !== phonenumber) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate OTP
    const otpCode = crypto.randomBytes(3).toString("hex"); // 6-digit hex OTP

    // Hash the OTP before saving
    const hashedOtp = await bcrypt.hash(otpCode, 10);

    // Update the user with the new OTP
    person.otp = {
      code: hashedOtp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    };

    await person.save();

    // Set up nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: config.emailService,
      host: config.host,
      port: config.emailPort,
      secure: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Send OTP to the user's email
    let info = await transporter.sendMail({
      from: config.emailUser, // sender address
      to: person.email, // list of receivers
      subject: "Your OTP Code", // Subject line
      text: `Your OTP code is ${otpCode}. It will expire in 10 minutes.`, // plain text body
    });

    console.log("Message sent: %s", info.messageId);

    res.status(200).json({
      message: "OTP sent to your email. Please verify to proceed.",
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "An error occurred during login." });
  }
};

module.exports.verifyOtp = async function (req, res) {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    const person = await Person.findOne({ email });
    if (!person) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if OTP is still valid
    if (!person.otp || person.otp.expiresAt < new Date()) {
      return res
        .status(400)
        .json({ error: "OTP has expired. Please request a new one." });
    }

    // Verify the OTP
    const isOtpValid = await bcrypt.compare(otp, person.otp.code);
    if (!isOtpValid) {
      return res.status(401).json({ error: "Invalid OTP." });
    }

    // Clear the OTP after successful verification
    person.otp = null;
    await person.save();

    res.status(200).json({
      message: "OTP verified successfully. You are now logged in.",
      person: {
        fullname: person.fullname,
        email: person.email,
        phonenumber: person.phonenumber,
      },
    });
  } catch (err) {
    console.error("Error during OTP verification:", err);
    res
      .status(500)
      .json({ error: "An error occurred during OTP verification." });
  }
};
