# Project Log: Online Event Booking and Management System

## [2026-05-01] Phase 1 & 2: System Design & Frontend Foundation
- Initialized Node.js project and defined structure.
- Created core CSS with Glassmorphism and modern aesthetics.
- Developed Home, Login, and Register pages.
- Generated and set up hero assets.

## [2026-05-01] Phase 3 & 4: Backend Refactor & Booking Logic
- Reorganized project structure into `client/` and `server/` as per industry standards.
- Replaced session-based auth with **JWT (JSON Web Tokens)** for better scalability.
- Implemented `TKT{event_id}{user_id}{timestamp}` ticket generation logic.
- Added JWT middleware for route protection.

## [2026-05-01] Phase 5: Admin Panel & Final Integration
- Enhanced Admin Panel with Tabs: Events, Users, and Bookings.
- Implemented Admin APIs to view all users and global bookings.
- Integrated JWT Authorization header in all frontend fetch requests.
- Finalized documentation and setup instructions.

### Project Structure:
- `/public`: Static frontend files (HTML, CSS, JS).
- `/src`: Backend source code.
    - `/config`: Database and env configurations.
    - `/controllers`: Request handlers.
    - `/routes`: API endpoints.
    - `/models`: Database interactions.
    - `/middleware`: Auth and validation.
- `app.js`: Entry point.
- `schema.sql`: Database schema.

### Database Design:
- **Users**: `id`, `name`, `email`, `password`, `role` (Guest, User, Organizer, Admin)
- **Events**: `id`, `title`, `description`, `date`, `location`, `seats`, `organizer_id`
- **Bookings**: `id`, `user_id`, `event_id`, `ticket_id`, `booking_date`
