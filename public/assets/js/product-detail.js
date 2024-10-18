function changeImage(thumbnail) {
  const mainImage = document.getElementById('mainImage');
  const tempSrc = mainImage.src;
  mainImage.src = thumbnail.src;
  thumbnail.src = tempSrc;
}

function showOverlay(imageSrc) {
  const overlay = document.getElementById('imageOverlay');
  const overlayImage = document.getElementById('overlayImage');
  overlayImage.src = imageSrc;
  overlay.style.display = 'flex';
}

function hideOverlay() {
  const overlay = document.getElementById('imageOverlay');
  overlay.style.display = 'none';
}

function changeOverlayImage(thumbnail) {
  const overlayImage = document.getElementById('overlayImage');
  overlayImage.src = thumbnail.src;
}

// Thiết lập thời gian kết thúc (ví dụ: sau 12 giờ từ hiện tại)
const countdownDate = new Date().getTime() + 12 * 60 * 60 * 1000; // 12 giờ từ bây giờ

const timer = setInterval(function () {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  // Tính toán giờ, phút, giây còn lại
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Hiển thị đồng hồ đếm ngược
  document.getElementById('countdown-timer').innerHTML =
    '0 : ' +
    (hours < 10 ? '0' + hours : hours) +
    ' : ' +
    (minutes < 10 ? '0' + minutes : minutes) +
    ' : ' +
    (seconds < 10 ? '0' + seconds : seconds);

  // Nếu hết thời gian, dừng đồng hồ và hiển thị thông báo
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById('countdown-timer').innerHTML = 'Hết giờ';
  }
}, 1000);

function changeColor(color) {
  document.getElementById('selectedColor').innerText = color;
}
