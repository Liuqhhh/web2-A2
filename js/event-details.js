// js/event-details.js
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('eventId');
    const detailsContainer = document.getElementById('event-details');
    const registerButton = document.getElementById('register-button');

    if (!eventId) {
        showEventNotFound(detailsContainer, 'No event specified');
        return;
    }

    console.log(`📄 Loading event details ID: ${eventId}`);
    
    // Show loading state
    showLoadingState(detailsContainer);
    
    try {
        const response = await fetchData(`/events/${eventId}`);
        
        if (response && response.success) {
            const event = response.data;
            displayEventDetails(event, detailsContainer);
            
            // Update page title
            document.title = `${event.name} - Charity Events`;
            
            // Setup register button
            setupRegisterButton(registerButton, event);
        } else {
            throw new Error('Event not found or server error');
        }
    } catch (error) {
        console.error('Error loading event details:', error);
        showEventNotFound(detailsContainer, 'Failed to load event details');
    }
});

function showLoadingState(container) {
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; color: #666;">Loading event details...</p>
        </div>
    `;
}

function displayEventDetails(event, container) {
    const progressPercentage = event.goal_amount > 0 ? 
        Math.min((event.progress_amount / event.goal_amount * 100), 100).toFixed(1) : 0;
    
    const progressBar = event.goal_amount > 0 ? `
        <div class="progress-container">
            <div class="progress-labels">
                <span>Raised: ${formatCurrency(event.progress_amount)}</span>
                <span>Goal: ${formatCurrency(event.goal_amount)}</span>
                <span>${progressPercentage}%</span>
            </div>
            <progress value="${event.progress_amount}" max="${event.goal_amount}"></progress>
            <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #666; text-align: center;">
                Help us reach our goal! Your participation makes a difference.
            </p>
        </div>
    ` : '<p>This event supports our ongoing charitable efforts.</p>';
    
    container.innerHTML = `
        <div class="event-hero">
            <h1>${event.name}</h1>
            <div class="event-category-badge">${event.category_name}</div>
        </div>
        
        <div class="event-meta-grid">
            <div class="meta-item">
                <strong>📅 Date & Time</strong>
                <p>${formatDate(event.date)}</p>
            </div>
            <div class="meta-item">
                <strong>📍 Location</strong>
                <p>${event.location}</p>
            </div>
            <div class="meta-item">
                <strong>💰 Ticket Price</strong>
                <p>${formatCurrency(event.ticket_price)}</p>
            </div>
            <div class="meta-item">
                <strong>🎯 Category</strong>
                <p>${event.category_name}</p>
            </div>
        </div>
        
        <div class="event-purpose">
            <h3>🎯 Event Purpose</h3>
            <p>${event.purpose || 'Supporting charitable causes in our community.'}</p>
        </div>
        
        <div class="event-description">
            <h3>📖 Event Details</h3>
            <p>${event.full_description || event.description || 'Join us for this special event supporting meaningful causes in our community. Your participation helps make a real difference.'}</p>
        </div>
        
        <div class="fundraising-goal">
            <h3>💰 Fundraising Progress</h3>
            ${progressBar}
        </div>
        
        <div class="event-cta">
            <h3>Ready to Make a Difference?</h3>
            <p>Join us for this event and help support our cause. Your participation and contribution will directly impact those in need.</p>
        </div>
    `;
}

function setupRegisterButton(button, event) {
    button.addEventListener('click', () => {
        const eventName = event.name;
        const ticketPrice = formatCurrency(event.ticket_price);
        
        const message = `
Registration for "${eventName}"

Ticket Price: ${ticketPrice}

This feature is currently under construction and will be available in the next version where you can:
• Purchase tickets securely
• Complete your registration
• Receive confirmation email
• Manage your event bookings

Thank you for your interest in supporting this charitable cause!

For now, please contact us directly to register:
📞 (555) 123-4567
✉️ contact@charityevents.org
        `.trim();
        
        alert(message);
    });
}

function showEventNotFound(container, message) {
    container.innerHTML = `
        <div class="error-message">
            <h3>Event Not Found</h3>
            <p>${message}</p>
            <p>The event you're looking for may have been removed or there might be an issue with the link.</p>
            <div style="margin-top: 1.5rem;">
                <a href="index.html" class="btn">🏠 Back to Home</a>
                <a href="search.html" class="btn btn-secondary">🔍 Browse Events</a>
            </div>
        </div>
    `;
}

// Add event details specific CSS
const eventDetailsStyle = document.createElement('style');
eventDetailsStyle.textContent = `
    .event-hero {
        text-align: center;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 2px solid #e5e7eb;
    }
    
    .event-category-badge {
        display: inline-block;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        margin-top: 1rem;
    }
    
    .event-meta-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
    }
    
    .meta-item {
        background: #f8fafc;
        padding: 1.5rem;
        border-radius: 10px;
        text-align: center;
        border-left: 4px solid #2563eb;
    }
    
    .meta-item strong {
        display: block;
        color: #374151;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }
    
    .meta-item p {
        color: #1e40af;
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0;
    }
    
    .progress-container {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        border: 2px solid #e5e7eb;
    }
    
    .progress-labels {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #374151;
    }
    
    .event-cta {
        text-align: center;
        padding: 2rem;
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        border-radius: 15px;
        margin-top: 2rem;
        border: 2px solid #bae6fd;
    }
    
    .event-cta h3 {
        color: #0369a1;
        margin-bottom: 1rem;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e5e7eb;
        border-top: 4px solid #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(eventDetailsStyle);