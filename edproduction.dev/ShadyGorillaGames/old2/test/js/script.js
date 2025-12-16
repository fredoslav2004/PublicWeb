var parallaxMultiplier = 2;

function updateParallaxMultiplier() {
    if (window.matchMedia('(max-width: 767px)').matches) {
        parallaxMultiplier = 1.2;
    } else if (window.matchMedia('(max-width: 991px)').matches) {
        parallaxMultiplier = 1.5;
    } else {
        parallaxMultiplier = 2;
    }
}

$(window).on('resize', updateParallaxMultiplier);
updateParallaxMultiplier(); // Initial check

$(window).on('scroll', function() {
    const $loadingImg = $('.parallax');
    
    if ($loadingImg.length) {
        const initialTop = $loadingImg.data('initialTop') || $loadingImg.offset().top;
        $loadingImg.data('initialTop', initialTop);
        $loadingImg.css('top', initialTop + $(window).scrollTop() * parallaxMultiplier);
    }
});

$(document).ready(function() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    function checkAnimation() {
        $('.anim-left, .anim-right').each(function() {
            if (isElementInViewport(this)) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }

    $(window).on('scroll', checkAnimation);
    $(window).on('resize', checkAnimation);

    checkAnimation(); // Initial check
});