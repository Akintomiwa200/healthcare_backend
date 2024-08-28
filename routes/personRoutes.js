
const express = require('express');
const personController = require('../controllers/personController');

const router = express.Router();

router.post('/', personController.addPerson);
router.get('/:id', personController.getPersonById);
router.put('/:id', personController.updatePersonById);
router.delete('/:id', personController.deletePersonById);
router.get('/', personController.getAllPersons);

module.exports = router;
