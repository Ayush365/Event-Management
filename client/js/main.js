document.addEventListener('DOMContentLoaded', () => {
    updateNav();
    loadEvents();
});

function updateNav() {
    const authButtons = document.querySelector('.auth-buttons');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
        let dashboardLink = '';
        if (user.role === 'Admin') dashboardLink = '<li><a href="admin.html">Admin Panel</a></li>';
        else if (user.role === 'Organizer') dashboardLink = '<li><a href="organizer-dashboard.html">Dashboard</a></li>';
        else dashboardLink = '<li><a href="bookings.html">My Bookings</a></li>';
        
        const navUl = document.querySelector('nav ul');
        
        if (user.role === 'Admin') {
            if (!navUl.innerHTML.includes('Admin Panel')) navUl.innerHTML += '<li><a href="admin.html">Admin Panel</a></li>';
        } else if (user.role === 'Organizer') {
            if (!navUl.innerHTML.includes('Dashboard')) navUl.innerHTML += '<li><a href="organizer-dashboard.html">Dashboard</a></li>';
        } else {
            if (!navUl.innerHTML.includes('My Bookings')) navUl.innerHTML += '<li><a href="bookings.html">My Bookings</a></li>';
        }
        
        authButtons.innerHTML = `
            <span style="margin-right: 1rem; font-weight: 600; color: #fff;">Hi, ${user.name}</span>
            <button onclick="logout()" class="btn" style="background: rgba(255,255,255,0.1); color: #fff; padding: 0.5rem 1rem; font-size: 0.9rem;">Logout</button>
        `;
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

let allEvents = [];

async function loadEvents() {
    const eventList = document.getElementById('event-list');
    if (!eventList) return; // Only run on index

    try {
        const response = await fetch('/api/events');
        allEvents = await response.json();
        renderEvents(allEvents);
    } catch (err) {
        console.error('Error loading events:', err);
    }
}

function renderEvents(eventsToRender) {
    const eventList = document.getElementById('event-list');
    if (eventsToRender.length > 0) {
        eventList.innerHTML = eventsToRender.map(event => `
            <div class="event-card">
                <div class="event-content">
                    <div class="event-date">${new Date(event.date).toLocaleDateString()}</div>
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                    </div>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">${event.description.substring(0, 100)}...</p>
                    <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: auto;">
                        <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        eventList.innerHTML = '<p>No approved events found.</p>';
    }
}

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn && searchInput) {
        const performSearch = () => {
            const query = searchInput.value.toLowerCase();
            const filtered = allEvents.filter(e => 
                e.title.toLowerCase().includes(query) || 
                e.location.toLowerCase().includes(query) ||
                e.description.toLowerCase().includes(query)
            );
            renderEvents(filtered);
            document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
});
