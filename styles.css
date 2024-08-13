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
    
    // Here you would typically send the form data to a server
    // For this example, we'll just log it to the console
    const formData = new FormData(this);
    console.log('Form submitted:');
    for (let [key, value] of formData.entries()) {
        console.log(key + ': ' + value);
    }
    
    // Clear the form
    this.reset();
    
    // Show a success message
    alert('Thank you for your message. We\'ll get back to you soon!');
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
