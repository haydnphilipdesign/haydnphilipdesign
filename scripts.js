// Load More Button
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more-graphics');
    const additionalGraphics = document.getElementById('additional-graphics');

    loadMoreBtn.addEventListener('click', function() {
        if (additionalGraphics.style.display === 'none') {
            additionalGraphics.style.display = 'block';
            loadMoreBtn.textContent = 'View Less';
        } else {
            additionalGraphics.style.display = 'none';
            loadMoreBtn.textContent = 'View More';
        }
    });
});

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 3,
        },
    }
});

// Initialize GSAP for parallax effect
gsap.registerPlugin(ScrollTrigger);

gsap.to(".parallax-bg", {
    y: "-50%",
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// GSAP animations for sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        }
    });
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Show loading message
    document.getElementById('form-status').textContent = 'Sending...';

    emailjs.send('default_service', 'contact_form', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById('form-status').textContent = 'Message sent successfully!';
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            document.getElementById('form-status').textContent = 'Failed to send message. Please try again.';
        });
});

// Password protection for client access
document.getElementById('submit-password').addEventListener('click', function() {
    var passwordInput = document.getElementById('password-input');
    if (passwordInput.value === 'correct-password') {  // Replace 'correct-password' with your actual password
        document.querySelector('.client-content').style.display = 'block';
        document.getElementById('password-form').style.display = 'none';
    } else {
        alert('Incorrect password. Please try again.');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;
        
        window.scrollTo({
            top: targetElement.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});
