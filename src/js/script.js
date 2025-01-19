const $navButton = document.querySelector('.nav__button--menu');
const $navList = document.querySelector('.nav__list');
const $iconLink = document.querySelector('#iconlink');
const listItems = document.querySelectorAll('.nav__list li a');

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


const init = () => {
    initNavigation();
    revealHiddenStories();
};

init();
