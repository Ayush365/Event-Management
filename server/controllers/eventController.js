const db = require('../config/db');

exports.getAllEvents = async (req, res) => {
    try {
        const [events] = await db.execute('SELECT * FROM Events WHERE status = "Approved" ORDER BY date ASC');
        res.json(events);
    } catch (err) {
        console.error("GET /api/events ERROR:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getOrganizerEvents = async (req, res) => {
    try {
        const [events] = await db.execute('SELECT * FROM Events WHERE organizer_id = ? ORDER BY date DESC', [req.user.id]);
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const [events] = await db.execute('SELECT * FROM Events WHERE id = ?', [id]);
        if (events.length === 0) return res.status(404).json({ message: 'Event not found' });
        res.json(events[0]);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createEvent = async (req, res) => {
    const { role, id: organizer_id } = req.user;
    if (role !== 'Organizer' && role !== 'Admin') {
        return res.status(403).json({ message: 'Unauthorized. Only organizers can create events.' });
    }

    const { title, description, date, location, seats } = req.body;
    const status = role === 'Admin' ? 'Approved' : 'Pending';

    try {
        const [result] = await db.execute(
            'INSERT INTO Events (title, description, date, location, seats, organizer_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, description, date, location, seats, organizer_id, status]
        );
        res.status(201).json({ message: 'Event created successfully', eventId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, location, seats } = req.body;
    const { id: userId, role } = req.user;

    try {
        const [events] = await db.execute('SELECT organizer_id FROM Events WHERE id = ?', [id]);
        if (events.length === 0) return res.status(404).json({ message: 'Event not found' });

        if (events[0].organizer_id !== userId && role !== 'Admin') {
            return res.status(403).json({ message: 'Unauthorized to update this event' });
        }

        await db.execute(
            'UPDATE Events SET title = ?, description = ?, date = ?, location = ?, seats = ? WHERE id = ?',
            [title, description, date, location, seats, id]
        );
        res.json({ message: 'Event updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteEvent = async (req, res) => {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    try {
        const [events] = await db.execute('SELECT organizer_id FROM Events WHERE id = ?', [id]);
        if (events.length === 0) return res.status(404).json({ message: 'Event not found' });

        if (events[0].organizer_id !== userId && role !== 'Admin') {
            return res.status(403).json({ message: 'Unauthorized to delete this event' });
        }

        await db.execute('DELETE FROM Bookings WHERE event_id = ?', [id]);
        await db.execute('DELETE FROM Events WHERE id = ?', [id]);
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
