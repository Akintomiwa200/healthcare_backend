const Appointment = require('../models/Appointment');


exports.addAppointment = async (req, res) => {
    try {
        const { doctor, reason, date } = req.body;
        const appointment = new Appointment({ doctor, reason, date });
        await appointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (err) {
        res.status(400).json({ error: `Failed to create appointment: ${err.message}` });
    }
};


exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (err) {
        res.status(400).json({ error: `Failed to retrieve appointment: ${err.message}` });
    }
};


exports.updateAppointmentById = async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment status updated', appointment });
    } catch (err) {
        res.status(400).json({ error: `Failed to update appointment: ${err.message}` });
    }
};


exports.deleteAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: `Failed to delete appointment: ${err.message}` });
    }
};


exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(400).json({ error: `Failed to retrieve appointments: ${err.message}` });
    }
};
