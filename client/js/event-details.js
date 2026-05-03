document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`/api/events/${eventId}`);
        const event = await response.json();

        if (response.ok) {
            document.getElementById('event-title').textContent = event.title;
            document.getElementById('event-description').textContent = event.description;
            document.getElementById('event-date').textContent = new Date(event.date).toLocaleString();
            document.getElementById('event-location').textContent = event.location;
            document.getElementById('event-seats').textContent = event.seats;
            
            const bookBtn = document.getElementById('book-now-btn');
            bookBtn.onclick = () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = 'login.html';
                } else {
                    bookEvent(eventId, token);
                }
            };
        }
    } catch (err) {
        console.error('Error fetching event:', err);
    }
});

async function bookEvent(eventId, token) {
    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ event_id: eventId })
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Booking Successful! Your Ticket ID: ${data.ticket_id}`);
            window.location.href = 'bookings.html';
        } else {
            alert(data.message || 'Booking failed');
        }
    } catch (err) {
        alert('Server error. Please try again.');
    }
}
