const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const router = express.Router();


router.post('/api/appointments', appointmentController.addAppointment);
router.get('/api/appointments/:id', appointmentController.getAppointmentById);
router.put('/api/appointments/:id', appointmentController.updateAppointmentById);
router.delete('/api/appointments/:id', appointmentController.deleteAppointmentById);
router.get('/api/appointments', appointmentController.getAllAppointments);

module.exports = router;
