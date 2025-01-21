const $navButton = document.querySelector('.nav__button--menu');
const $navList = document.querySelector('.nav__list');
const $iconLink = document.querySelector('#iconlink');
const listItems = document.querySelectorAll('.nav__list li a');

// Navigation
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

const checkPosition = (x, y, width, height, placedBubbles, overlapThreshold) => {
    return !placedBubbles.some(placed => {
        const dx = x - placed.x;
        const dy = y - placed.y;
        const distance = Math.sqrt(dx * dx + dy * dy); 
        return distance < (width + placed.width) / 2 - overlapThreshold; 
    });
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
        // Save the bubble's position
        placedBubbles.push({ x: randomX, y: randomY, width: bubbleWidth, height: bubbleHeight });

        // Apply position and animation
        bubble.style.left = `${randomX}px`;
        bubble.style.top = `${randomY}px`;
        bubble.style.transform = 'scale(0)';
        bubble.style.opacity = '0.5';

        setTimeout(() => {
            bubble.style.transition = 'transform 2s ease-in-out, opacity 2s ease-in-out';
            bubble.style.transform = 'scale(1)';
            bubble.style.opacity = '1';
        }, Math.random() * 5000);
    } else {
        console.warn('Could not place bubble after max attempts.');
    }
};

const animateBubbles = () => {
    const bubbles = document.querySelectorAll('.bubble');
    const container = document.querySelector('.humanists__ideas');

    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();

    const placedBubbles = [];
    const overlapThreshold = 70; 

    bubbles.forEach(bubble => animateBubble(bubble, containerWidth, containerHeight, placedBubbles, overlapThreshold));
};




//Initialization
const init = () => {
    initNavigation();
    revealHiddenStories();
    animateBubbles();
};

init();
