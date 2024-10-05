const slides = document.querySelectorAll('.banner-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
let slideInterval;

// Hiển thị slide theo chỉ số
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

// Chuyển về slide trước đó
prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
  showSlide(currentSlide);
  resetAutoSlide();
});

// Chuyển sang slide kế tiếp
nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
  showSlide(currentSlide);
  resetAutoSlide();
});

// Tự động chuyển slide
function autoSlide() {
  slideInterval = setInterval(() => {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
  }, 3000); // Chuyển sau mỗi 3 giây
}

// Reset lại thời gian tự động khi người dùng thao tác với nút điều hướng
function resetAutoSlide() {
  clearInterval(slideInterval);
  autoSlide();
}

// Bắt đầu tự động chạy slide khi tải trang
autoSlide();
