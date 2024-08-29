const Person = require('../models/Person');


exports.addPerson = async (req, res) => {
    try {
        const person = new Person(req.body);
        await person.save();
        res.status(201).json({ message: 'Person added successfully', person });
    } catch (err) {
        res.status(400).json({ error: `Failed to add person: ${err.message}` });
    }
};


exports.getPersonById = async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json(person);
    } catch (err) {
        res.status(400).json({ error: `Failed to retrieve person: ${err.message}` });
    }
};


exports.updatePersonById = async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json({ message: 'Person updated successfully', person });
    } catch (err) {
        res.status(400).json({ error: `Failed to update person: ${err.message}` });
    }
};


exports.deletePersonById = async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) {
            return res.status(404).json({ error: 'Person not found' });
        }
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: `Failed to delete person: ${err.message}` });
    }
};


exports.getAllPersons = async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json(persons);
    } catch (err) {
        res.status(400).json({ error: `Failed to retrieve persons: ${err.message}` });
    }
};
