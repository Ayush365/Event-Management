const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);

// Protected routes (Organizers/Admins)
router.get('/organizer', auth, eventController.getOrganizerEvents);
router.post('/', auth, eventController.createEvent);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);

module.exports = router;
