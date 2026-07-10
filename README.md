# Online Event Booking and Management System 

A full-stack responsive web application for managing event bookings.

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Database**: MySQL


## Project Structure
```
project-root/
├── client/          # Frontend files (Pages, CSS, JS)
├── server/          # Backend source
│   ├── config/      # DB Connection
│   ├── controllers/ # API Logic
│   ├── routes/      # Endpoints
│   ├── middleware/  # JWT Auth
│   └── app.js       # Entry Point
├── database/        # MySQL Schema
├── docs/            # Test Cases & Wireframes
└── README.md
```

## System Architecture
### User Roles
- **Guest**: Browse events.
- **User**: Register, login, book events (JWT required).
- **Organizer**: Create & manage events (Pending admin approval).
- **Admin**: Full control over users, bookings, and event approvals.

### Booking Logic
- Ticket ID Format: `TKT + event_id + user_id + short_timestamp`
- Seat availability check before each booking.

## Setup Instructions

1. **Database**:
   - Execute `database/schema.sql` in your MySQL server.
2. **Environment**:
   - Update `.env` with your `DB_USER`, `DB_PASSWORD`, and a `JWT_SECRET`.
3. **Install & Run**:
   ```bash
   npm install
   node server/app.js
   ```
   Server runs on `http://localhost:5000`.

## Testing
- Unit and integration tests are documented in `docs/test_design.md`.
- Use the Admin panel to approve organizer events before they appear on the home page.


Here is the complete list of all 20 generated test users and their roles.

🔑 The password for ALL of these users is strictly: password123

👤 Standard Users (Role: User)
These users can browse and book events.

user1@example.com
user5@example.com
user9@example.com
user13@example.com
user17@example.com
📅 Event Organizers (Role: Organizer)
These users have the authority to create events.

user2@example.com
user6@example.com
user10@example.com
user14@example.com
user18@example.com
🛡️ Administrators (Role: Admin)
These users can approve/reject events and have full system access.

user3@example.com
user7@example.com
user11@example.com
user15@example.com
user19@example.com
👻 Guests (Role: Guest)
Limited access level.

user4@example.com
user8@example.com
user12@example.com
user16@example.com
user20@example.com

