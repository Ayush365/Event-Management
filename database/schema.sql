-- =============================================================
-- Event Booking and Management System - MySQL Schema
-- =============================================================

-- Create database if it does not exist and select it
CREATE DATABASE IF NOT EXISTS event_booking_db;
USE event_booking_db;

    -- Disable foreign key checks to allow dropping tables safely
    SET FOREIGN_KEY_CHECKS = 0;
    DROP TABLE IF EXISTS Bookings;
    DROP TABLE IF EXISTS Events;
    DROP TABLE IF EXISTS Users;
    -- Re‑enable foreign key checks for subsequent operations
    SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- Table: Users
-- ------------------------------------------------------------
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Guest','User','Organizer','Admin') NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: Events
-- ------------------------------------------------------------
CREATE TABLE Events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    date DATETIME NOT NULL,
    location VARCHAR(200) NOT NULL,
    seats INT NOT NULL CHECK (seats > 0),
    organizer_id INT NOT NULL,
    status ENUM('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_events_organizer FOREIGN KEY (organizer_id) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Table: Bookings
-- ------------------------------------------------------------
CREATE TABLE Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    ticket_id VARCHAR(50) NOT NULL UNIQUE,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bookings_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT fk_bookings_event FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE,
    CONSTRAINT chk_ticket_format CHECK (ticket_id REGEXP '^TKT[0-9]+[0-9]+[A-Z0-9]+$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------------
-- Indexes for faster queries
-- ------------------------------------------------------------
CREATE INDEX idx_events_date ON Events(date);
CREATE INDEX idx_bookings_user_event ON Bookings(user_id, event_id);

-- ------------------------------------------------------------
-- Optional sample data (remove if not needed)
-- ------------------------------------------------------------
INSERT INTO Users (name, email, password, role) VALUES
    ('Admin User', 'admin@example.com', 'hashed_password_admin', 'Admin'),
    ('Organizer One', 'organizer@example.com', 'hashed_password_org', 'Organizer'),
    ('Regular User', 'user@example.com', 'hashed_password_user', 'User');

INSERT INTO Events (title, description, date, location, seats, organizer_id, status) VALUES
    ('Tech Summit 2026', 'Annual technology summit.', '2026-09-15 09:00:00', 'New York', 200, 2, 'Approved'),
    ('Music Fest', 'Live music performances.', '2026-08-20 15:00:00', 'Los Angeles', 300, 2, 'Pending');

-- End of schema


