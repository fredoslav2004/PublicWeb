const parallaxMultiplier = 0.7;

$(document).ready(function(){
    const $loadingImg = $('.parallax');
    const initialTop = $loadingImg.data('initialTop') || $loadingImg.offset().top;
    $loadingImg.data('initialTop', initialTop);
    const $win = $(window);
    $(window).on('scroll', function() {        
        $loadingImg.css('top', initialTop + $win.scrollTop() * parallaxMultiplier);
    });
})

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