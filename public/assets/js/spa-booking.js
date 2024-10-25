// public/assets/js/spa-script.js

document.addEventListener('DOMContentLoaded', function() {
    const treatments = [
        { id: 1, name: 'Swedish Massage', description: 'Relaxing full-body massage', price: 80, duration: 60, image: 'path/to/swedish-massage.jpg' },
        { id: 2, name: 'Deep Tissue Massage', description: 'Targets deep layers of muscle', price: 90, duration: 60, image: 'path/to/deep-tissue-massage.jpg' },
        { id: 3, name: 'Hot Stone Massage', description: 'Uses heated stones for deeper relaxation', price: 100, duration: 75, image: 'path/to/hot-stone-massage.jpg' },
        { id: 4, name: 'Aromatherapy Massage', description: 'Massage with essential oils', price: 95, duration: 60, image: 'path/to/aromatherapy-massage.jpg' },
        { id: 5, name: 'Facial Treatment', description: 'Rejuvenating skincare treatment', price: 70, duration: 45, image: 'path/to/facial-treatment.jpg' },
        { id: 6, name: 'Body Wrap', description: 'Detoxifying and moisturizing treatment', price: 85, duration: 60, image: 'path/to/body-wrap.jpg' },
    ];

    const offers = [
        { id: 1, name: 'Spa Day Package', description: 'Full day of pampering including massage, facial, and lunch', price: 200, image: 'path/to/spa-day-package.jpg' },
        { id: 2, name: 'Couples Retreat', description: 'Romantic spa experience for two', price: 180, image: 'path/to/couples-retreat.jpg' },
    ];

    const testimonials = [
        { name: 'Sarah L.', content: 'The best spa experience I\'ve ever had! The staff was incredibly professional and attentive.' },
        { name: 'John D.', content: 'I left feeling completely rejuvenated. The hot stone massage was out of this world!' },
        { name: 'Emily R.', content: 'The facial treatment did wonders for my skin. I\'ll definitely be coming back!' },
    ];

    function populateTreatments() {
        const container = document.getElementById('treatmentsContainer');
        container.innerHTML = treatments.map(treatment => `
            <div class="col-md-4 mb-4">
                <div class="card treatment-card h-100">
                    <img src="${treatment.image}" class="card-img-top" alt="${treatment.name}">
                    <div class="card-body">
                        <h5 class="card-title">${treatment.name}</h5>
                        <p class="card-text">${treatment.description}</p>
                        <p class="card-text"><strong>Price:</strong> $${treatment.price}</p>
                        <p class="card-text"><strong>Duration:</strong> ${treatment.duration} minutes</p>
                        <button class="btn btn-primary book-treatment" data-treatment-id="${treatment.id}">Book Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function populateOffers() {
        const container = document.getElementById('offersContainer');
        container.innerHTML = offers.map(offer => `
            <div class="col-md-6 mb-4">
                <div class="card offer-card h-100">
                    <img src="${offer.image}" class="card-img-top" alt="${offer.name}">
                    <div class="card-body">
                        <h5 class="card-title">${offer.name}</h5>
                        <p class="card-text">${offer.description}</p>
                        <p class="card-text"><strong>Price:</strong> $${offer.price}</p>
                        <button class="btn btn-primary book-treatment" data-treatment-id="${offer.id}">Book Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function populateTestimonials() {
        const container = document.getElementById('testimonialsContainer');
        container.innerHTML = testimonials.map(testimonial => `
            <div class="col-md-4 mb-4">
                <div class="card testimonial-card h-100">
                    <div class="card-body">
                        <p class="card-text">"${testimonial.content}"</p>
                        <p class="card-text"><strong>- ${testimonial.name}</strong></p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function populateTreatmentSelect() {
        const select = document.getElementById('treatmentSelect');
        select.innerHTML = treatments.concat(offers).map(treatment => `
            <option value="${treatment.id}">${treatment.name} - $${treatment.price}</option>
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
    populateTreatments();
    populateOffers();
    populateTestimonials();
    populateTreatmentSelect();
    populateTimeOptions();

    // Event listeners
    document.querySelectorAll('.book-treatment').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('treatmentSelect').value = button.getAttribute('data-treatment-id');
            new bootstrap.Modal(document.getElementById('bookingModal')).show();
        });
    });

    document.getElementById('bookingForm').addEventListener('submit', handleBooking);
});
