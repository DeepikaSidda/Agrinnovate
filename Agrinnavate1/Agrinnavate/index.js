document.addEventListener('DOMContentLoaded', () => {
    // Load dynamic content for best practices
    fetch('/api/best-practices')
        .then(response => response.json())
        .then(data => {
            const bestPracticesContent = document.getElementById('best-practices-content');
            bestPracticesContent.innerHTML = `<p>${data.content}</p>`;
        });

    // Load dynamic content for crop management
    fetch('/api/crop-management')
        .then(response => response.json())
        .then(data => {
            const cropManagementContent = document.getElementById('crop-management-content');
            cropManagementContent.innerHTML = `<p>${data.content}</p>`;
        });

    // Load dynamic content for market trends
    fetch('/api/market-trends')
        .then(response => response.json())
        .then(data => {
            const marketTrendsContent = document.getElementById('market-trends-content');
            marketTrendsContent.innerHTML = `<p>${data.content}</p>`;
        });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement form submission logic
        alert('Form submitted!');
    });

    // Handle user icon click for displaying the authentication modal
    const userIcon = document.querySelector('.user-icon');
    const modal = document.getElementById('auth-modal');
    const closeButton = document.querySelector('.close-button');

    userIcon.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

function previewImage() {
    const file = document.getElementById('fileInput').files[0];
    const preview = document.getElementById('preview');

    const reader = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
        preview.style.display = 'block';
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
}

function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        alert('Image uploaded successfully!');
    } else {
        alert('No file chosen.');
    }
}
  
const elements = document.querySelectorAll('.slide-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

elements.forEach(element => {
  observer.observe(element);
});
AOS.init({
    duration: 1000, // duration of animation
    offset: 200,    // offset from the viewport to start the animation
  });
  

ScrollReveal().reveal('.slide-in', { 
    distance: '100px',
    origin: 'left',
    opacity: 0,
    duration: 1000 
  });
  