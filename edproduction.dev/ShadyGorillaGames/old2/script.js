
let stage = 0;
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const heroLogo = document.querySelector('.game-logo');
const mainHeader = document.querySelector('#header-main');
const topHeader = document.querySelector('#header-top');
const bottomHeader = document.querySelector('#header-bottom');
const topHeaderLogo = document.querySelector('#header-top-logo');
const maxScrollHeader = 400;
const maxHeaderHeight = 100;
let minHeaderHeight = 8;
const heroScrollTrigger = 1000;
const headerShrinkTrigger = 100;

function handleScroll() {
    const scrollY = window.scrollY;

    // Define the quick transition range
    const quickTransitionStart = 8;
    const quickTransitionEnd = 32;
    
    let adjustedScrollY = scrollY;

    if (window.matchMedia('(max-aspect-ratio: 1.2)').matches) 
    {
        minHeaderHeight = 0;
    }
    else
    {
        minHeaderHeight = 8;
    }

    // Adjust scrollY to skip the range 8 to 32 quickly
    if (scrollY > quickTransitionStart && scrollY < quickTransitionEnd) {
        adjustedScrollY = quickTransitionStart + (scrollY - quickTransitionStart) / 10;
    } else if (scrollY >= quickTransitionEnd) {
        adjustedScrollY = scrollY - (quickTransitionEnd - quickTransitionStart) * 0.9;
    }

    const headerHeight = Math.max(minHeaderHeight, maxHeaderHeight - adjustedScrollY * (maxHeaderHeight - minHeaderHeight) / maxScrollHeader);

    header.style.height = `${headerHeight}vh`;

    const heroHeight = 164 + headerHeight;
    hero.style.height = `${heroHeight}vh`;

    setHeader(headerHeight);

    if (scrollY < heroScrollTrigger) {
        heroLogo.classList.remove('hidden');
    } else {
        heroLogo.classList.add('hidden');
    }
}

const headerMainMin = 80;
const headerMainMax = 100;
function setHeader(headerHeight) {
    const opacity = Math.max(0, Math.min(1, (headerHeight - headerMainMin) / (headerMainMax - headerMainMin)));
    topHeader.style.opacity = 1;
    mainHeader.style.opacity = opacity;
    topHeaderLogo.style.opacity = 1 - opacity;
    bottomHeader.style.opacity = Math.max(0, Math.min(1, (headerHeight - headerMainMin) / (headerMainMax - headerMainMin)));

    if (opacity === 0) {
        //topHeader.classList.add('unselectable');
        mainHeader.classList.add('unselectable');
        topHeaderLogo.classList.add('unselectable');
        bottomHeader.classList.add('unselectable');
    } else {
        //topHeader.classList.remove('unselectable');
        mainHeader.classList.remove('unselectable');
        topHeaderLogo.classList.remove('unselectable');
        bottomHeader.classList.remove('unselectable');
    }
}

function toggleScroll(enable) {
    document.body.style.overflow = enable ? '' : 'hidden';
    if (enable) {
        document.removeEventListener('touchmove', preventScroll, { passive: false });
        document.removeEventListener('wheel', preventScroll, { passive: false });
        document.removeEventListener('scroll', preventScroll, { passive: false });
    } else {
        document.addEventListener('touchmove', preventScroll, { passive: false });
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('scroll', preventScroll, { passive: false });
    }
}

function preventScroll(event) {
    event.preventDefault();
}

window.addEventListener('scroll', handleScroll);

handleScroll();

const elements = document.querySelectorAll('.anim-left, .anim-right');

const checkVisibility = () => {
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    });
};

window.addEventListener('scroll', checkVisibility);
checkVisibility(); // Initial check on page load


window.addEventListener('resize', handleScroll);
