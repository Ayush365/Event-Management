# Test Design Document: Online Event Booking System

| Test Case # | Test Step # | Application/Screen | Test Case | Expected Result | Pre-Requisites | Input | Iteration # | Cross-Validation Method | Actual Result | Defect (Y/N) |
|-------------|-------------|--------------------|-----------|-----------------|----------------|-------|-------------|-------------------------|---------------|--------------|
| TC-001      | 1           | Registration       | Register new user | User account created and redirected to login | Valid DB connection | Name, Email, Password, Role | 1 | DB Select | Pending | N |
| TC-002      | 1           | Login              | User Authentication | User session created and redirected to home | User exists in DB | Email, Password | 1 | Session Check | Pending | N |
| TC-003      | 1           | Event Creation     | Organizer creates event | Event stored with "Pending" status | Logged in as Organizer | Title, Desc, Date, Seats, Loc | 1 | DB Select | Pending | N |
| TC-004      | 1           | Admin Approval     | Admin approves event | Event status changes to "Approved" | Logged in as Admin | Event ID, Status: Approved | 1 | UI Check (Home) | Pending | N |
| TC-005      | 1           | Booking Flow       | User books event | Booking stored, Ticket ID generated | Logged in as User, Seats available | Event ID | 1 | DB Select | Pending | N |
| TC-006      | 2           | Booking Flow       | Book with 0 seats | Error: "No seats available" | Event seats full | Event ID | 1 | UI Alert | Pending | N |

## Test Case Template

**Test Case #**: TC-005
**Description**: Validate the booking flow and ticket generation.
**Screen**: Event Details
**Steps**:
1. Login as a Registered User.
2. Navigate to an Approved Event.
3. Click "Book Now".
**Expected Result**: Success alert showing unique Ticket ID. Booking record added to database.
**Pre-Requisites**: User is logged in, event has available seats.
**Test Data**: Event ID: 1, User ID: 5.

## Test Scenario Template

| Req ID | Scenario ID | Screen | Condition | Expected Result | Priority |
|--------|-------------|--------|-----------|-----------------|----------|
| REQ-01 | TS-01       | Login  | Invalid credentials | Access denied, error message shown | High |
| REQ-02 | TS-02       | Booking| Seat availability | Prevent booking if seats = 0 | Critical |
| REQ-03 | TS-03       | Admin  | Event Management | Admin can toggle event visibility | Medium |
