// public/assets/js/spa-detail.js

document.addEventListener('DOMContentLoaded', function () {
    const reviews = [
        { name: 'Emily R.', rating: 5, content: 'Absolutely amazing experience! The aromatherapy massage was so relaxing, and the therapist was incredibly skilled. I left feeling completely rejuvenated.' },
        { name: 'Michael S.', rating: 4, content: 'Great massage and very soothing atmosphere. The essential oils used were perfect for my needs. Will definitely come back!' },
        { name: 'Sarah L.', rating: 5, content: 'This was my first aromatherapy massage, and it exceeded all my expectations. The staff was friendly, and the treatment itself was pure bliss.' }
    ];

    function populateReviews() {
        const container = document.getElementById('reviewsContainer');
        container.innerHTML = reviews.map(review => `
            <div class="col-md-4 mb-4">
                <div class="review-card">
                    <h5>${review.name}</h5>
                    <div class="star-rating mb-2">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                    <p>${review.content}</p>
                </div>
            </div>
        `).join('');
    }

    function populateTimeOptions() {
        const select = document.getElementById('bookingTime');
        const times = [];
        for (let hour = 9; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                times.push(`<option value="${time}">${time}</option>`);
            }
        }
        select.innerHTML = times.join('');
    }

    function handleBooking(event) {
        event.preventDefault();
        // Here you would typically send the booking data to your server
        alert('Booking submitted successfully! We will contact you to confirm your appointment.');
        document.getElementById('bookingForm').reset();
        bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
    }

    // Initialize page content
    populateReviews();
    populateTimeOptions();

    // Event listeners
    document.getElementById('bookingForm').addEventListener('submit', handleBooking);
});

