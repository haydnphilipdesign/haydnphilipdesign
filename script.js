// Skills data
const skills = [
    { name: 'Graphic Design', icon: 'fas fa-paint-brush' },
    { name: 'Web Design', icon: 'fas fa-laptop-code' },
    { name: 'Brand Development', icon: 'fas fa-bullhorn' },
    { name: 'UI/UX Design', icon: 'fas fa-user-circle' },
    { name: 'Photography', icon: 'fas fa-camera' },
    { name: 'Digital Marketing', icon: 'fas fa-chart-line' }
];

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Populate skills grid
    const skillsGrid = document.querySelector('.skills-grid');
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <i class="${skill.icon}"></i>
            <h3>${skill.name}</h3>
        `;
        skillsGrid.appendChild(skillItem);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // View My Work button functionality
    document.getElementById('view-work-btn').addEventListener('click', () => {
        document.getElementById('portfolio').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Client Access functionality
    const loginForm = document.getElementById('login-form');
    const restrictedContent = document.getElementById('restricted-content');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('password').value;
        
        // Simple password check (replace with secure authentication in production)
        if (password === 'secretpassword') {
            loginForm.style.display = 'none';
            restrictedContent.style.display = 'block';
            restrictedContent.innerHTML = '<h3>Welcome, valued client!</h3><p>Here is your exclusive content...</p>';
        } else {
            alert('Incorrect password. Please try again.');
        }
    });

    // Lazy loading for portfolio images
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }

    // Add simple animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });
    document.querySelectorAll('section > .container').forEach(section => {
        observer.observe(section);
    });

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Initialize Masonry
    const msnry = new Masonry('.masonry-grid', {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        percentPosition: true
    });

    // Reinitialize Masonry after all images are loaded
    imagesLoaded('.masonry-grid').on('progress', function() {
        msnry.layout();
    });
});