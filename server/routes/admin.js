const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'Admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
    }
};

router.use(auth, isAdmin);

router.get('/users', adminController.getAllUsers);
router.get('/bookings', adminController.getAllBookings);
router.get('/events', adminController.getAllEvents);
router.patch('/events/:id/status', adminController.updateEventStatus);

module.exports = router;
