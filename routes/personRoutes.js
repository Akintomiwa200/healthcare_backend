const express = require('express');
const personController = require('../controllers/personController');
const router = express.Router();


router.post('/api/persons/add', personController.addPerson);
router.get('/api/persons/:id', personController.getPersonById);
router.put('/api/persons/:id', personController.updatePersonById);
router.delete('/api/persons/:id', personController.deletePersonById);
router.get('/api/persons', personController.getAllPersons);

module.exports = router;
