const db = require('./server/config/db');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
    try {
        console.log("Starting database seeding...");

        // 1. Insert 20 Users
        const users = [];
        const roles = ['Guest', 'User', 'Organizer', 'Admin'];
        const passwordHash = await bcrypt.hash('password123', 10);
        
        for (let i = 1; i <= 20; i++) {
            const role = roles[i % roles.length];
            users.push([
                `User ${i}`,
                `user${i}@example.com`,
                passwordHash,
                role
            ]);
        }
        
        await db.query('INSERT INTO Users (name, email, password, role) VALUES ?', [users]);
        console.log("Inserted 20 users.");

        // Get all organizers to assign events to
        const [organizers] = await db.query('SELECT id FROM Users WHERE role IN ("Organizer", "Admin")');
        
        // 2. Insert 20 Events
        const events = [];
        const statuses = ['Pending', 'Approved', 'Approved', 'Approved', 'Rejected'];
        const locations = ['New York', 'Los Angeles', 'London', 'Tokyo', 'Berlin', 'Sydney', 'Paris', 'Toronto'];
        
        for (let i = 1; i <= 20; i++) {
            const orgId = organizers[i % organizers.length].id;
            const status = statuses[i % statuses.length];
            const loc = locations[i % locations.length];
            const date = new Date();
            date.setDate(date.getDate() + (i * 2)); // Future dates
            
            events.push([
                `Event ${i}: Awesome Gathering`,
                `This is a detailed description for event ${i}. Join us for an amazing experience with great people.`,
                date,
                loc,
                Math.floor(Math.random() * 400) + 50, // 50 to 450 seats
                orgId,
                status
            ]);
        }
        
        await db.query('INSERT INTO Events (title, description, date, location, seats, organizer_id, status) VALUES ?', [events]);
        console.log("Inserted 20 events.");

        // Get all users and events to create bookings
        const [allUsers] = await db.query('SELECT id FROM Users');
        const [allEvents] = await db.query('SELECT id FROM Events WHERE status = "Approved"');
        
        // 3. Insert 20 Bookings
        const bookings = [];
        for (let i = 1; i <= 20; i++) {
            const userId = allUsers[i % allUsers.length].id;
            const eventId = allEvents[i % allEvents.length].id;
            // Format constraint: ^TKT[0-9]+[0-9]+[A-Z0-9]+$ -> TKT + numbers + alphanum
            const timestamp = Date.now();
            const ticketId = `TKT${timestamp}${i}ABC`;
            
            bookings.push([
                userId,
                eventId,
                ticketId
            ]);
        }
        
        // Use IGNORE in case of duplicate user_id + event_id if unique index exists (only ticket_id is unique per schema)
        await db.query('INSERT IGNORE INTO Bookings (user_id, event_id, ticket_id) VALUES ?', [bookings]);
        console.log("Inserted 20 bookings.");

        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seedDatabase();
