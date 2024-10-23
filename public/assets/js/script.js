const slides = document.querySelectorAll('.banner-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
  currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
  showSlide(currentSlide);
  resetAutoSlide();
});

nextBtn.addEventListener('click', () => {
  currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
  showSlide(currentSlide);
  resetAutoSlide();
});

function autoSlide() {
  slideInterval = setInterval(() => {
    currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    showSlide(currentSlide);
  }, 3000);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  autoSlide();
}

autoSlide();

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Search suggestions
const searchInput = document.getElementById('searchInput');
const searchSuggestions = document.getElementById('searchSuggestions');

const fetchSuggestions = debounce((query) => {
  if (query.length < 2) {
    searchSuggestions.classList.add('d-none');
    return;
  }

  // Replace this with your actual API endpoint
  fetch(`/api/search-suggestions?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      searchSuggestions.innerHTML = '';
      if (data.length > 0) {
        data.forEach(suggestion => {
          const li = document.createElement('li');
          li.textContent = suggestion;
          li.addEventListener('click', () => {
            searchInput.value = suggestion;
            searchSuggestions.classList.add('d-none');
          });
          searchSuggestions.appendChild(li);
        });
        searchSuggestions.classList.remove('d-none');
      } else {
        searchSuggestions.classList.add('d-none');
      }
    })
    .catch(error => console.error('Error fetching suggestions:', error));
}, 300);

searchInput.addEventListener('input', (e) => fetchSuggestions(e.target.value));

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
    searchSuggestions.classList.add('d-none');
  }
});

// Prevent form submission and handle search
document.getElementById('searchForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    // Implement your search logic here
    console.log('Searching for:', query);
    // You can redirect to a search results page or fetch results dynamically
  }
});
