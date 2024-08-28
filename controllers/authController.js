// const Person = require('../models/Person');
// const Otp = require('../models/Otp');
// const { generateOtp } = require('../utils/otpGenerator');
// const { sendOtp } = require('../utils/sendOtp');

// // Login - Send OTP
// exports.login = async (req, res) => {
//     const { phoneNumber } = req.body;

//     try {
//         const person = await Person.findOne({ phoneNumber });

//         if (!person) {
//             return res.status(404).json({ error: 'Person not found' });
//         }

//         const otp = generateOtp();
//         await Otp.create({ phoneNumber, otp });

//         await sendOtp(phoneNumber, otp);

//         res.status(200).json({ message: 'OTP sent successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Signup - Register new user and send OTP
// exports.signup = async (req, res) => {
//     const { phoneNumber, name } = req.body;

//     try {
//         const existingPerson = await Person.findOne({ phoneNumber });

//         if (existingPerson) {
//             return res.status(400).json({ error: 'Phone number already registered' });
//         }

//         const newPerson = new Person({ phoneNumber, name });
//         await newPerson.save();

//         const otp = generateOtp();
//         await Otp.create({ phoneNumber, otp });

//         await sendOtp(phoneNumber, otp);

//         res.status(201).json({ message: 'Signup successful, OTP sent' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Verify OTP
// exports.verifyOtp = async (req, res) => {
//     const { phoneNumber, otp } = req.body;

//     try {
//         const existingOtp = await Otp.findOne({ phoneNumber, otp });

//         if (!existingOtp) {
//             return res.status(400).json({ error: 'Invalid OTP' });
//         }

//         // OTP is valid, remove OTP from DB (optional) and proceed with login or other actions
//         await Otp.deleteOne({ phoneNumber, otp });

//         res.status(200).json({ message: 'OTP verified successfully', person: existingOtp.phoneNumber });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };



const Person = require('../models/Person');
const Otp = require('../models/Otp');
const { generateOtp } = require('../utils/otpGenerator');
const { sendOtp } = require('../utils/sendOtp');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Login - Send OTP
exports.login = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const person = await Person.findOne({ phoneNumber });

        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }

        const otp = generateOtp();
        await Otp.create({ phoneNumber, otp });

        await sendOtp(phoneNumber, otp);

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Signup - Register new user and send OTP
exports.signup = async (req, res) => {
    const { phoneNumber, name } = req.body;

    try {
        const existingPerson = await Person.findOne({ phoneNumber });

        if (existingPerson) {
            return res.status(400).json({ error: 'Phone number already registered' });
        }

        const newPerson = new Person({ phoneNumber, name });
        await newPerson.save();

        const otp = generateOtp();
        await Otp.create({ phoneNumber, otp });

        await sendOtp(phoneNumber, otp);

        res.status(201).json({ message: 'Signup successful, OTP sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    try {
        const validOtp = await Otp.findOne({ phoneNumber, otp });

        if (!validOtp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        await Otp.deleteMany({ phoneNumber });

        const person = await Person.findOne({ phoneNumber });

        const token = jwt.sign({ personId: person._id }, config.jwtSecret, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
