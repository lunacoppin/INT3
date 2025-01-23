// Hamburger
const $navButton = document.querySelector('.nav__button--menu');
const $navList = document.querySelector('.nav__list');
const $iconLink = document.querySelector('#iconlink');
const listItems = document.querySelectorAll('.nav__list li a');

// Cards Carroussel
const $list = document.querySelector('.strategy__cards');
const $cards = document.querySelectorAll('.card');
const $prev = document.querySelector('.button-prev'); 
const $next = document.querySelector('.button-next'); 
const itemWidth = $cards[0].offsetWidth; 
const gap = parseInt(getComputedStyle($list).gap) || 0;
const cardCount = $cards.length; 
let currentIndex = 0; 

// Printing
const $ctaButton = document.getElementById("cta-button");
const $afterText = document.querySelector(".printing__p--after");
const $fullText = $afterText.innerText.trim();
let progress = 0;
let interval;
let vibrationInterval;

// Light 
const $light = document.querySelector('.light');
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const $debugOutput = document.getElementById('debug');
const isMobile = /Mobi|Android/i.test(navigator.userAgent);



// Hamburger
const openNavigation = () => {
    $navButton.setAttribute("aria-expanded", "true");
    $iconLink.setAttribute("xlink:href", "#close");
    $navList.classList.remove("hidden");
};
const closeNavigation = () => {
    $navButton.setAttribute("aria-expanded", "false");
    $iconLink.setAttribute("xlink:href", "#navicon");
    $navList.classList.add("hidden");
};
const toggleNavigation = () => {
    const open = $navButton.getAttribute("aria-expanded");
    open === "false" ? openNavigation() : closeNavigation();
};
const handleBlur = () => {
    closeNavigation();
};
const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
        $navButton.focus();
        closeNavigation();
    }
};
const initNavigation = () => {
    $navButton.classList.remove('hidden');
    $navList.classList.add("hidden");

    $navButton.addEventListener("click", toggleNavigation);

    const lastItem = listItems[listItems.length - 1];
    lastItem.addEventListener("blur", handleBlur);

    window.addEventListener("keyup", handleEscapeKey);
};

// Stories
function revealHiddenStories() {
    const hiddenStories = document.querySelectorAll('.story-hidden');

    if (window.innerWidth < 1120) {
        hiddenStories.forEach(story => {
            story.classList.add('visually-hidden');
        });
    } else if (window.innerWidth >= 1120) { 
        hiddenStories.forEach(story => {
            story.classList.remove('visually-hidden');
        });
    }
}
window.addEventListener('resize', revealHiddenStories);


// Bubbles
const checkPosition = (x, y, width, height, placedBubbles, overlapThreshold) => {
    return !placedBubbles.some(placed => {
        const dx = x - placed.x;
        const dy = y - placed.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (width + placed.width) / 2 - overlapThreshold; 
    });
};
const removeBubblePosition = (bubble, placedBubbles) => {
    const bubbleLeft = parseFloat(bubble.style.left);
    const bubbleTop = parseFloat(bubble.style.top);

    const index = placedBubbles.findIndex(placed =>
        Math.abs(placed.x - bubbleLeft) < 1 && 
        Math.abs(placed.y - bubbleTop) < 1    
    );

    if (index > -1) {
        placedBubbles.splice(index, 1);
    }
};
const animateBubble = (bubble, containerWidth, containerHeight, placedBubbles, overlapThreshold) => {
    const bubbleWidth = bubble.offsetWidth;
    const bubbleHeight = bubble.offsetHeight;

    let randomX, randomY;
    let maxAttempts = 500;
    let validPosition = false;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        randomX = Math.random() * (containerWidth - bubbleWidth);
        randomY = Math.random() * (containerHeight - bubbleHeight);

        if (checkPosition(randomX, randomY, bubbleWidth, bubbleHeight, placedBubbles, overlapThreshold)) {
            validPosition = true;
            break;
        }
    }

    if (validPosition) {
        placedBubbles.push({ x: randomX, y: randomY, width: bubbleWidth, height: bubbleHeight });

        bubble.style.position = 'absolute';
        bubble.style.left = `${randomX}px`;
        bubble.style.top = `${randomY}px`;
        bubble.style.transform = 'scale(0)';
        bubble.style.opacity = '0.5';
        bubble.querySelector('.bubble__p').style.color = '#ECEAE5'

        setTimeout(() => {
            bubble.style.transition = 'transform 2s ease-in-out, opacity 2s ease-in-out';
            bubble.style.transform = 'scale(0.9)';
            bubble.style.opacity = '1';
        }, Math.random() * 8000); 
    }
};
const handleBubbleClick = (bubble, placedBubbles, containerWidth, containerHeight, overlapThreshold) => {
    const bubbleText = bubble.querySelector('.bubble__p');
    if (!bubble.dataset.originalText) {
        bubble.dataset.originalText = bubbleText.textContent;
    }

    const originalText = bubble.dataset.originalText; 
    bubbleText.textContent = 'You cannot stop the ideas of Humanism from spreading...';
    bubble.style.backgroundImage = `url("src/assets/svg/background-bubble-after.svg")`;
    bubble.style.transition = 'opacity 5s ease-in';
    bubble.style.opacity = '0';
    bubble.style.transform = 'scale(1.2)'
    bubbleText.style.transform = 'scale(1)';
    bubbleText.style.color = '#5A564E';

    removeBubblePosition(bubble, placedBubbles);

    const handleTransition = (e) => {
        if (e.propertyName !== 'opacity') return;

        bubble.removeEventListener('transitionend', handleTransition);

        bubble.style.transition = 'none';
        bubble.style.transform = 'scale(0)';
        bubble.style.opacity = '0.5';
        bubble.style.backgroundImage = `url('../assets/svg/background-bubble-bfore.svg')`;
        bubbleText.textContent = originalText; 

        // console.log('Current placed bubbles:', placedBubbles);

        requestAnimationFrame(() => {
            animateBubble(bubble, containerWidth, containerHeight, placedBubbles, overlapThreshold);
        });
    };

    bubble.addEventListener('transitionend', handleTransition);
};
const animateBubbles = () => {
    const bubbles = document.querySelectorAll('.bubble');
    const container = document.querySelector('.humanists__ideas');

    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();

    const placedBubbles = [];
    const overlapThreshold = 70; 

    bubbles.forEach(bubble => {
        animateBubble(bubble, containerWidth, containerHeight, placedBubbles, overlapThreshold);

        bubble.addEventListener('click', () => {
            handleBubbleClick(bubble, placedBubbles, containerWidth, containerHeight, overlapThreshold);
        });
    });
};


// Carousel
const updateScrollPosition = () =>{
    $list.scrollLeft = currentIndex * (itemWidth + gap);
}

// Printing
const updateText = () => {
    progress += 1; 
    const sliceIndex = Math.ceil((progress / 100) * $fullText.length);
    $afterText.innerText = $fullText.slice(0, sliceIndex);
    $afterText.style.opacity = "1";


    if (sliceIndex >= $fullText.length) {
        clearInterval(interval);
        clearInterval(vibrationInterval); 
        stopVibration();
    }
}
const startVibration = () => {
    if (navigator.vibrate) {
        vibrationInterval = setInterval(() => {
            navigator.vibrate(50); 
        }, 100);
    }
}
const stopVibration = () => {
    if (navigator.vibrate) {
        navigator.vibrate(0);
        clearInterval(vibrationInterval); 
    }
}
const pressPrint = () => {
    const startPrinting = () => {
        clearInterval(interval); 
        interval = setInterval(updateText, 50);
        startVibration();
    };

    const stopPrinting = () => {
        clearInterval(interval); 
        stopVibration();
    };

    $ctaButton.addEventListener("pointerdown", startPrinting);
    $ctaButton.addEventListener("pointerup", stopPrinting);
    $ctaButton.addEventListener("pointercancel", stopPrinting);
};

// Dropdown
const $options = document.querySelectorAll('.choice__option');
$options.forEach((option) => {
    const $optionP = option.querySelector('.option__p');
    option.addEventListener('click', () => {
        option.classList.toggle('active');
        $optionP.classList.toggle('hidden');
    });
});

// Light in the Dark
const lightInteraction = () => {
    if (!isMobile && window.PointerEvent) {
        // Handle pointer events (desktop)
        if (isSafari) {
            window.addEventListener('pointermove', (e) => {
                const { clientX, clientY } = e;
                $light.style.left = `${clientX}px`;
                $light.style.top = `${clientY}px`;
            });
        } else {
            window.addEventListener('pointermove', (e) => {
                const { clientX, clientY } = e;
                $light.animate(
                    {
                        left: `${clientX}px`,
                        top: `${clientY}px`,
                    },
                    { duration: 1000, fill: 'forwards' }
                );
            });
        }
    }
    else if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            const { beta, gamma } = e; // beta: front-back tilt, gamma: left-right tilt

            // Map beta (front-back tilt) and gamma (left-right tilt) to screen coordinates
            const y = clamp(window.innerHeight / 4 + beta * 5, 0, window.innerHeight);
            const x = clamp(window.innerWidth / 2 + gamma * 5, 0, window.innerWidth);

            // Apply a smooth animation to the light using the animate() method
            $light.animate(
                {
                    left: `${x}px`,
                    top: `${y}px`,
                },
                {
                    duration: 1000, // Set the duration of the animation (adjust as needed)
                    easing: 'ease-out', // Apply smooth easing
                    fill: 'forwards', // Ensure the final position is retained
                }
            );
        });
    } else {
        $debugOutput.innerHTML = 'DeviceOrientationEvent or PointerEvent is not supported on this device.';
    }
};




// Initialization
const init = () => {
    initNavigation();
    revealHiddenStories();
    animateBubbles();

    $prev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateScrollPosition();
    });

    $next.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cardCount;
        updateScrollPosition();
    });
    
    pressPrint();
    lightInteraction();
};

init();


