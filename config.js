require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  //   dbUri: process.env.MONGO_URI,
  connectionstring: process.env.CONNECTION_STRING,
  jwtSecret: process.env.JWT_SECRET,
  otpExpiry: 10 * 60 * 1000, // 10 minutes
  otpLength: 6,
  emailService: process.env.EMAIL_SERVICE,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  host: process.env.HOST,
  emailPort: process.env.GMAIL_PORT,
};
