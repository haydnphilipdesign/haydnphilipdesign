document.addEventListener("DOMContentLoaded", function() {
    // Initialize Swiper
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Add animation for photo items
    const photoItems = document.querySelectorAll('.photo-item');
    const animatePhotos = () => {
        photoItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animatePhotos);
    animatePhotos(); // Initial check on page load

    // Animate skill items on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const animateSkills = () => {
        skillItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Initial check on page load

    // Parallax effect for hero background
    const parallaxBg = document.querySelector('.parallax-bg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message. I will get back to you soon!');
        contactForm.reset();
    });

    // Client access functionality
    const clientLoginForm = document.getElementById('client-login-form');
    const restrictedContent = document.getElementById('restricted-content');
    clientLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('client-password').value;
        // Replace 'your-password' with the actual password
        if (password === 'your-password') {
            restrictedContent.style.display = 'block';
            clientLoginForm.style.display = 'none';
        } else {
            alert('Incorrect password. Please try again.');
        }
    });

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate portfolio items
    gsap.utils.toArray('.portfolio-categories > div').forEach(category => {
        gsap.from(category, {
            opacity: 0,
            x: -50,
            duration: 1,
            scrollTrigger: {
                trigger: category,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Masonry layout for photography section
    function resizeGridItem(item){
        grid = document.getElementsByClassName("photo-masonry")[0];
        rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
        rowSpan = Math.ceil((item.querySelector('img').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
        item.style.gridRowEnd = "span "+rowSpan;
    }

    function resizeAllGridItems(){
        allItems = document.getElementsByClassName("photo-item");
        for(x=0;x<allItems.length;x++){
            resizeGridItem(allItems[x]);
        }
    }

    window.addEventListener("load", resizeAllGridItems);
    window.addEventListener("resize", resizeAllGridItems);
});