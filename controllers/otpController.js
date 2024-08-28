const Otp = require('../models/Otp');
const Person = require('../models/Person');
const jwt = require('jsonwebtoken');
const config = require('../config');

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
