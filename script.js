// PRELOADER
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);
  }, 800);
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// CLOSE MENU ON LINK CLICK
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// GALLERY DATA
const galleryImages = [
  "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/8613076/pexels-photo-8613076.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/8613085/pexels-photo-8613085.jpeg?auto=compress&w=400",
  "https://images.pexels.com/photos/5212348/pexels-photo-5212348.jpeg?auto=compress&w=400"
];

function renderGallery() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;
  
  galleryGrid.innerHTML = galleryImages.map(img => `
    <div class="gallery-item" style="background-image: url('${img}');" onclick="openGalleryModal('${img}')"></div>
  `).join('');
}

// GALLERY MODAL
function openGalleryModal(imgSrc) {
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = 'flex';
  modalImg.src = imgSrc;
}

// CLOSE MODAL
document.querySelector('.close-modal')?.addEventListener('click', () => {
  document.getElementById('galleryModal').style.display = 'none';
});

window.onclick = (e) => {
  if (e.target === document.getElementById('galleryModal')) {
    document.getElementById('galleryModal').style.display = 'none';
  }
};

// ADMISSION FORM TO WHATSAPP
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
  admissionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const parentName = document.getElementById('parentName').value;
    const childName = document.getElementById('childName').value;
    const classSelect = document.getElementById('classSelect').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const message = document.getElementById('admissionMessage').value;
    
    const whatsappMsg = `🏫 *New Admission Inquiry - LAL School System*%0A%0A👨‍👩‍👧 *Parent Name:* ${parentName}%0A👧 *Child Name:* ${childName}%0A📚 *Class:* ${classSelect}%0A📞 *Phone:* ${phoneNumber}%0A💬 *Message:* ${message}%0A%0A_This is an admission inquiry from website._`;
    
    window.open(`https://wa.me/923013819728?text=${whatsappMsg}`, '_blank');
    
    // Optional: Reset form
    // admissionForm.reset();
  });
}

// TESTIMONIALS SLIDER
let currentTesti = 0;
const testimonialsContainer = document.getElementById('testimonialsContainer');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevTesti = document.getElementById('prevTesti');
const nextTesti = document.getElementById('nextTesti');

function updateTestiSlider() {
  if (testimonialsContainer) {
    testimonialsContainer.style.transform = `translateX(-${currentTesti * 100}%)`;
  }
}

if (nextTesti) {
  nextTesti.addEventListener('click', () => {
    currentTesti = (currentTesti + 1) % testimonialCards.length;
    updateTestiSlider();
  });
}

if (prevTesti) {
  prevTesti.addEventListener('click', () => {
    currentTesti = (currentTesti - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestiSlider();
  });
}

// SCROLL ANIMATIONS
const animatedElements = document.querySelectorAll('.why-card, .program-card, .facility-card, .gallery-item, .testimonial-card');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  appearOnScroll.observe(el);
});

// STICKY NAVBAR ON SCROLL
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
  }
});

// INITIALIZE
renderGallery();

// Make openGalleryModal globally available
window.openGalleryModal = openGalleryModal;
