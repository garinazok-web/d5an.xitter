// Image Slider Functionality
const sliders = document.querySelectorAll('.image-slider');

// Create modal for image viewing
const modal = document.createElement('div');
modal.className = 'image-modal';
modal.innerHTML = `
  <span class="close-btn">&times;</span>
  <button class="modal-arrow modal-prev">
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  </button>
  <img src="" alt="Full size image">
  <button class="modal-arrow modal-next">
    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  </button>
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('img');
const closeBtn = modal.querySelector('.close-btn');
const modalPrevBtn = modal.querySelector('.modal-prev');
const modalNextBtn = modal.querySelector('.modal-next');

let currentSliderImages = [];
let currentModalIndex = 0;

sliders.forEach((slider) => {
  let currentIndex = 0;
  const images = slider.querySelectorAll('.slider-image');
  const prevBtn = slider.querySelector('.prev-arrow');
  const nextBtn = slider.querySelector('.next-arrow');

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.remove('active');
      if (i === index) {
        img.classList.add('active');
      }
    });
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
  }

  // Click to view full size
  images.forEach((img, index) => {
    img.addEventListener('click', function() {
      currentSliderImages = Array.from(images);
      currentModalIndex = index;
      modalImg.src = this.src;
      modal.classList.add('show');
      updateModalArrows();
    });
  });
});

function updateModalArrows() {
  if (currentSliderImages.length > 1) {
    modalPrevBtn.style.display = 'flex';
    modalNextBtn.style.display = 'flex';
  } else {
    modalPrevBtn.style.display = 'none';
    modalNextBtn.style.display = 'none';
  }
}

function showModalImage(index) {
  if (currentSliderImages[index]) {
    modalImg.src = currentSliderImages[index].src;
    currentModalIndex = index;
  }
}

// Modal navigation
modalNextBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  currentModalIndex = (currentModalIndex + 1) % currentSliderImages.length;
  showModalImage(currentModalIndex);
});

modalPrevBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  currentModalIndex = (currentModalIndex - 1 + currentSliderImages.length) % currentSliderImages.length;
  showModalImage(currentModalIndex);
});

// Close modal
closeBtn.addEventListener('click', function() {
  modal.classList.remove('show');
});

modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

// Disable right-click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// Disable F12 and other dev tools shortcuts
document.addEventListener('keydown', function(e) {
  if (e.keyCode === 123) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.keyCode === 85) {
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.keyCode === 83) {
    e.preventDefault();
    return false;
  }
});

// Disable image dragging
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('dragstart', function(e) {
      e.preventDefault();
    });
  });
});

