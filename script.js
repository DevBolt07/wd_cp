// Navigation toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

navMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    navMenu.classList.remove('active');
  }
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// Smooth scrolling
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// Scroll to top
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.pageYOffset > 300);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Form validation for contact (if present)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Enter a valid email');
      return;
    }
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
  });
}

// === Dynamic Cultural Gallery Using Pexels API and Wikipedia Links ===
const PEXELS_API_KEY = '1om9rdWXk8PAzlmisrNff3hmKaLeTCzF3FmB63Ls8BovV8oMjwHb4UNR';
const GALLERY_TERMS = [
  'Traditional Dance',
  'Heritage Architecture',
  'Folk Art',
  'Musical Instruments',
  'Handicrafts',
  'Cultural Festival'
];

const galleryContainer = document.getElementById('gallery-container');

async function fetchImagesFromPexels(query) {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
    headers: { Authorization: PEXELS_API_KEY }
  });
  const data = await response.json();
  return data.photos.length > 0 ? data.photos[0].src.large : null;
}

async function populateGallery() {
  for (const term of GALLERY_TERMS) {
    const imgUrl = await fetchImagesFromPexels(term);
    if (imgUrl) {
      const wikiLink = `https://en.wikipedia.org/wiki/${term.replace(/\\s+/g, '_')}`;
      const item = document.createElement('div');
      item.className = 'gallery-item';

      item.innerHTML = `
        <a href=\"${wikiLink}\" target=\"_blank\" title=\"Learn more about ${term}\">
          <img src=\"${imgUrl}\" alt=\"${term}\" />
          <div class=\"gallery-overlay\">
            <i class=\"fab fa-wikipedia-w\"></i>
          </div>
        </a>
      `;
      galleryContainer.appendChild(item);
    }
  }
}

// Remove old lightbox if it exists
document.getElementById('lightbox')?.remove();

// Load gallery on DOM ready
document.addEventListener('DOMContentLoaded', populateGallery);
