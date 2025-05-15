// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const slides = document.querySelectorAll('.slide');
const inquiryForm = document.getElementById('inquiryForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const groceryInput = document.getElementById('grocery');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const groceryError = document.getElementById('groceryError');

// Mobile Navigation
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  const sections = document.querySelectorAll('section');
  const header = document.querySelector('.header');

  // Add shadow to header on scroll
  if (scrollPos > 10) {
    header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
  }

  // Highlight active section in navigation
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (sectionId && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Banner Slideshow
let currentSlide = 0;

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Initialize slideshow
if (slides.length > 0) {
  showSlide(0);
  setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Form Validation
function validateName() {
  const name = nameInput.value.trim();
  if (name === '') {
    nameError.textContent = 'Name is required';
    return false;
  } else if (name.length < 3) {
    nameError.textContent = 'Name must be at least 3 characters';
    return false;
  } else {
    nameError.textContent = '';
    return true;
  }
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email === '') {
    emailError.textContent = 'Email is required';
    return false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address';
    return false;
  } else {
    emailError.textContent = '';
    return true;
  }
}

function validateGrocery() {
  const grocery = groceryInput.value;
  if (grocery === '') {
    groceryError.textContent = 'Please select a package';
    return false;
  } else {
    groceryError.textContent = '';
    return true;
  }
}

// Real-time validation
if (nameInput) {
  nameInput.addEventListener('blur', validateName);
  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim().length > 0) {
      validateName();
    }
  });
}

if (emailInput) {
  emailInput.addEventListener('blur', validateEmail);
  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim().length > 0) {
      validateEmail();
    }
  });
}

if (groceryInput) {
  groceryInput.addEventListener('change', validateGrocery);
}

// Form submission
if (inquiryForm) {
  inquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isGroceryValid = validateGrocery();
    
    if (isNameValid && isEmailValid && isGroceryValid) {
      // Form is valid, show success message
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        package: groceryInput.value
      };
      
      console.log('Form submitted:', formData);
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.style.backgroundColor = '#3B8E5F';
      successMessage.style.color = 'white';
      successMessage.style.padding = '16px';
      successMessage.style.borderRadius = '8px';
      successMessage.style.marginTop = '16px';
      successMessage.style.textAlign = 'center';
      successMessage.innerHTML = `
        <p><strong>Thank you, ${formData.name}!</strong></p>
        <p>Your inquiry about our ${formData.package.replace('-', ' ')} package has been received.</p>
        <p>We'll contact you at ${formData.email} shortly.</p>
      `;
      
      inquiryForm.reset();
      inquiryForm.parentNode.appendChild(successMessage);
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Add animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.package-card, .contact-form, .dynamic-insights');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.animation = 'fadeIn 1s ease forwards';
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);