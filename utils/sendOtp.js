
const nodemailer = require('nodemailer');
const config = require('../config');

exports.sendOtp = async (phoneNumber, otp) => {
    const transporter = nodemailer.createTransport({
        service: config.emailService,
        auth: {
            user: config.emailUser,
            pass: config.emailPass,
        },
    });

    const mailOptions = {
        from: config.emailUser,
        to: phoneNumber + '@carrier.example.com', // Replace with actual carrier email-to-SMS gateway
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};
