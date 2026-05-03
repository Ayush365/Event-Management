const db = require('../config/db');

exports.createBooking = async (req, res) => {
    // req.user is populated by the auth middleware
    if (!req.user) {
        return res.status(401).json({ message: 'Please login to book an event' });
    }

    const { event_id } = req.body;
    const user_id = req.user.id;

    try {
        // 1. Check seat availability
        const [event] = await db.execute('SELECT seats FROM Events WHERE id = ?', [event_id]);
        if (event.length === 0) return res.status(404).json({ message: 'Event not found' });

        const [bookings] = await db.execute('SELECT COUNT(*) as count FROM Bookings WHERE event_id = ?', [event_id]);
        
        if (bookings[0].count >= event[0].seats) {
            return res.status(400).json({ message: 'No seats available' });
        }

        // 2. Generate unique ticket ID: TKT + event_id + user_id + timestamp (to ensure uniqueness if multiple bookings)
        const ticket_id = `TKT${event_id}${user_id}${Date.now().toString().slice(-4)}`;

        // 3. Store booking
        await db.execute(
            'INSERT INTO Bookings (user_id, event_id, ticket_id) VALUES (?, ?, ?)',
            [user_id, event_id, ticket_id]
        );

        res.status(201).json({ 
            message: 'Booking successful', 
            ticket_id,
            booking_details: { event_id, user_id, ticket_id }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserBookings = async (req, res) => {
    const user_id = req.user.id;
    try {
        const [bookings] = await db.execute(`
            SELECT b.*, e.title, e.date, e.location 
            FROM Bookings b 
            JOIN Events e ON b.event_id = e.id 
            WHERE b.user_id = ?
        `, [user_id]);
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
