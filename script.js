let isDarkMode = false;
const sunIcon = document.querySelector("#sun");
const socialIcons = document.querySelectorAll(".social"); // Select social media icons
const hamburger = document.querySelector(".hamburger");
const menuBar = document.querySelector(".menu-bar");

if (!sunIcon) {
    console.error("Element with ID 'sun' not found.");
}

const updateUI = () => {
    // Update icon source
    sunIcon.src = isDarkMode ?"icon-sun.svg"  :"icon-moon.svg" ;
    // Toggle rotate class for icon
    sunIcon.classList.toggle("rotate", !isDarkMode);
    // Toggle dark-theme class on body
    document.body.classList.toggle("dark-theme", isDarkMode);
    // Update social icons color
    socialIcons.forEach(icon => {
        icon.style.color = isDarkMode ? "#ffffff" : "#333333";
    });
};

// Initialize UI
updateUI();

sunIcon.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    updateUI();
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Fade-in and pop-up animation for sections and project cards on scroll
const sections = document.querySelectorAll('section');
const projectCards = document.querySelectorAll('.project-card');

window.addEventListener('scroll', () => {
  // Section fade-in
  sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop < windowHeight - 100) {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
      }
  });

  // Project cards pop-up
  projectCards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (cardTop < windowHeight - 100) {
          card.classList.add('visible');
      }
  });
});

// Initial styles for fade-in animation
sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 0.5s ease';
});

// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
body.classList.add(`${savedTheme}-theme`);

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light-theme')) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
  } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
  }
});

// Contact Form Functionality
const contactForm = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Client-side validation
  const name = contactForm.querySelector('input[name="name"]').value.trim();
  const email = contactForm.querySelector('input[name="email"]').value.trim();
  const message = contactForm.querySelector('textarea[name="message"]').value.trim();

  if (!name || !email || !message) {
      formMessage.textContent = 'Please fill out all fields.';
      formMessage.classList.remove('success');
      formMessage.classList.add('error');
      return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.classList.remove('success');
      formMessage.classList.add('error');
      return;
  }

  // Submit the form to Formspree using Fetch API
  try {
      const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
              'Accept': 'application/json'
          }
      });

      if (response.ok) {
          formMessage.textContent = 'Message sent successfully! I’ll get back to you soon.';
          formMessage.classList.remove('error');
          formMessage.classList.add('success');
          contactForm.reset(); // Clear the form
      } else {
          throw new Error('Failed to send message.');
      }
  } catch (error) {
      formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
      formMessage.classList.remove('success');
      formMessage.classList.add('error');
  }
});
hamburger.addEventListener("click", () => {
    menuBar.classList.toggle("active");
    hamburger.querySelector("i").classList.toggle("fa-bars");
    hamburger.querySelector("i").classList.toggle("fa-times");
});