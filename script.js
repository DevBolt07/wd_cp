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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Form validation for contact (basic)
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  function validateForm() {
    let valid = true;

    // Reset error messages
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';
    status.textContent = '';

    // Name validation
    if (!nameInput.value.trim().match(/^[A-Za-z\s]{3,}$/)) {
      nameError.textContent = 'Please enter at least 3 letters.';
      valid = false;
    }

    // Email validation
    if (!emailInput.value.trim().match(/^\S+@\S+\.\S+$/)) {
      emailError.textContent = 'Enter a valid email address.';
      valid = false;
    }

    // Subject validation
    if (subjectInput.value.trim().length < 5) {
      subjectError.textContent = 'Subject must be at least 5 characters.';
      valid = false;
    }

    // Message validation
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'Message should be at least 10 characters.';
      valid = false;
    }

    return valid;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm()) {
        status.style.color = 'green';
        status.textContent = 'Message sent successfully!';
        form.reset();
      } else {
        status.style.color = 'red';
        status.textContent = 'Please correct the errors above.';
      }
    });
  }
});
