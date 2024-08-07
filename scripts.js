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
            slidesPerView: 4,
        },
    }
});
// Initialize GSAP for parallax effect
gsap.to(".parallax-bg", {
    y: "-50%",
    scrollTrigger: {
        trigger: "#hero",
        scrub: 1
    }
});

document.addEventListener('DOMContentLoaded', function() {
        // Initialize Masonry
        var msnry = new Masonry('.my-gallery', {
            itemSelector: 'figure',
            columnWidth: 'figure',
            percentPosition: true
        });

        // Initialize PhotoSwipe
        var initPhotoSwipeFromDOM = function(gallerySelector) {
            var parseThumbnailElements = function(el) {
                var thumbElements = el.querySelectorAll('figure'),
                    numNodes = thumbElements.length,
                    items = [],
                    figureEl,
                    linkEl,
                    size,
                    item;

                for(var i = 0; i < numNodes; i++) {
                    figureEl = thumbElements[i];
                    linkEl = figureEl.children[0];
                    size = linkEl.getAttribute('data-size').split('x');

                    item = {
                        src: linkEl.getAttribute('href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };

                    if(figureEl.children.length > 1) {
                        item.title = figureEl.children[1].innerHTML;
                    }

                    if(linkEl.children.length > 0) {
                        item.msrc = linkEl.children[0].getAttribute('src');
                    }

                    item.el = figureEl;
                    items.push(item);
                }

                return items;
            };

            var closest = function closest(el, fn) {
                return el && ( fn(el) ? el : closest(el.parentNode, fn) );
            };

            var onThumbnailsClick = function(e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;

                var eTarget = e.target || e.srcElement;

                var clickedListItem = closest(eTarget, function(el) {
                    return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
                });

                if(!clickedListItem) {
                    return;
                }

                var clickedGallery = clickedListItem.parentNode,
                    childNodes = clickedListItem.parentNode.querySelectorAll('figure'),
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;

                for (var i = 0; i < numChildNodes; i++) {
                    if(childNodes[i] === clickedListItem) {
                        index = i;
                        break;
                    }
                }

                if(index >= 0) {
                    openPhotoSwipe( index, clickedGallery );
                }
                return false;
            };

            var photoswipeParseHash = function() {
                var hash = window.location.hash.substring(1),
                    params = {};

                if(hash.length < 5) {
                    return params;
                }

                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if(!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');
                    if(pair.length < 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }

                if(params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }

                return params;
            };

            var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery,
                    options,
                    items;

                items = parseThumbnailElements(galleryElement);

                options = {
                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                    getThumbBoundsFn: function(index) {
                        var thumbnail = items[index].el.getElementsByTagName('img')[0],
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();

                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    }
                };

                if(fromURL) {
                    if(options.galleryPIDs) {
                        for(var j = 0; j < items.length; j++) {
                            if(items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }

                if( isNaN(options.index) ) {
                    return;
                }

                if(disableAnimation) {
                    options.showAnimationDuration = 0;
                }

                gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            };

            var galleryElements = document.querySelectorAll( gallerySelector );

            for(var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i+1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

            var hashData = photoswipeParseHash();
            if(hashData.pid && hashData.gid) {
                openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
            }
        };

        initPhotoSwipeFromDOM('.my-gallery');

        // Show gallery after Masonry initialization
        document.querySelector('.my-gallery').style.display = 'block';
    });

gsap.registerPlugin(ScrollTrigger);

// Hero section
gsap.from("#hero h1", {
    opacity: 0,
    y: -50,
    duration: 1,
    scrollTrigger: {
        trigger: "#hero",
        start: "top 80%",
    }
});

// About section
gsap.from("#about p", {
    opacity: 0,
    x: -50,
    duration: 1,
    scrollTrigger: {
        trigger: "#bio",
        start: "top 80%",
    }
});

// Services section
gsap.from("#skills .skill-item", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3, // Adds a slight delay between each item
    scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
    }
});

// Portfolio section
gsap.from("#portfolio .photo-item", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
        trigger: "#portfolio",
        start: "top 80%",
    }
});

// Contact section
gsap.from("#contact form", {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
    }
});

// Client section
gsap.from("#client-access .client-content", {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
        trigger: "#client-access",
        start: "top 80%",
    }
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
    
    // Show a success message (you can style this further)
    alert('Thank you for your message. We\'ll get back to you soon!');
});
