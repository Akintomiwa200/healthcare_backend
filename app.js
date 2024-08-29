const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const personRoutes = require('./routes/personRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();


const corsOptions = {
  origin: "*", 
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
};

app.use(cors(corsOptions)); 

app.options("*", cors(corsOptions)); 


app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// app.use("/api/persons", personRoutes);
app.use(personRoutes);
app.use(appointmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
