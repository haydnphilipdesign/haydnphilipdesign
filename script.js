document.addEventListener("DOMContentLoaded", function() {
    // Swiper initialization
    var swiper = new Swiper('.swiper-container', {
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

    // Masonry initialization
    var grid = document.querySelector('.masonry-grid');
    if (grid) {
        new Masonry(grid, {
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            percentPosition: true
        });
    }

    // Parallax scrolling
    window.addEventListener('scroll', function() {
        var scrollPosition = window.pageYOffset;
        var parallax = document.querySelector('.parallax-bg');
        if (parallax) {
            parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        }
    });
});
