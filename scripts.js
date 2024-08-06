        // Initialize Swiper
        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        const swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 3000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        // Initialize GSAP for parallax effect
        gsap.to(".parallax-bg", {
            y: "-50%",
            scrollTrigger: {
                trigger: "#hero",
                scrub: 1
            }
        });

    // execute above function
    initPhotoSwipeFromDOM('.my-gallery');
    const openPhotoSwipe = function(index, galleryElement) {
    const pswpElement = document.querySelectorAll('.pswp')[0];
    const items = parseThumbnailElements(galleryElement);

    const options = {
        index: index,
        bgOpacity: 0.7,
        showHideOpacity: true
    };

    const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};

document.querySelectorAll('.my-gallery').forEach(gallery => {
    gallery.addEventListener('click', function(event) {
        event.preventDefault();
        const clickedItem = event.target.closest('figure');
        const index = Array.from(gallery.children).indexOf(clickedItem);
        openPhotoSwipe(index, gallery);
    });
});
        <!-- PhotoSwipe Initialization -->
     var initPhotoSwipeFromDOM = function(gallerySelector) {
        // Parse slide data (url, title, size ...) from DOM elements
        // (children of gallerySelector)
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;

            for (var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; // <figure> element

                // include only element nodes
                if (figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };

                if (figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML;
                }

                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };

        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            // find root element of slide
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });

            if (!clickedListItem) {
                return;
            }

            // find index of clicked item
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedGallery.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if (index >= 0) {
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                params = {};

            if (hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if (params.gid) {
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

            // define options (if needed)
            options = {
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                getThumbBoundsFn: function(index) {
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
                }
            };

            // PhotoSwipe opened from URL
            if (fromURL) {
                if (options.galleryPIDs) {
                    // parse real index when custom PIDs are used
                    // (you may need to modify this)
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if (isNaN(options.index)) {
                return;
            }

            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll(gallerySelector);

        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid && hashData.gid) {
            openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
        }
    };

    // execute the function
    initPhotoSwipeFromDOM('.my-gallery');


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
gsap.from("#bio p", {
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


