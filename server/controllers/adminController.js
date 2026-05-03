const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT id, name, email, role FROM Users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const [bookings] = await db.execute(`
            SELECT b.*, u.name as user_name, e.title as event_title 
            FROM Bookings b 
            JOIN Users u ON b.user_id = u.id 
            JOIN Events e ON b.event_id = e.id
        `);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const [events] = await db.execute('SELECT * FROM Events ORDER BY date DESC');
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateEventStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.execute('UPDATE Events SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Event status updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
