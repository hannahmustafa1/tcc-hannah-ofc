/*!
* Start Bootstrap - Stylish Portfolio v6.0.6 (https://startbootstrap.com/theme/stylish-portfolio)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-stylish-portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

var radar = document.getElementById('radar'),
    diameter = 220,
    radius = diameter / 2,
    padding = 14,
    ctx = Sketch.create({
        container: radar,
        fullscreen: false,
        width: diameter,
        height: diameter
    }),
    dToR = function (degrees) {
        return degrees * (Math.PI / 180);
    },
    sweepAngle = 270,
    sweepSize = 2,
    sweepSpeed = 1.2,
    rings = 4,
    hueStart = 120,
    hueEnd = 170,
    hueDiff = Math.abs(hueEnd - hueStart),
    saturation = 50,
    lightness = 40,
    lineWidth = 2,
    gradient = ctx.createLinearGradient(radius, 0, 0, 0);


radar.style.marginLeft = radar.style.marginTop = (-diameter / 2) - padding + 'px';
gradient.addColorStop(0, 'hsla( ' + hueStart + ', ' + saturation + '%, ' + lightness + '%, 1 )');
gradient.addColorStop(1, 'hsla( ' + hueEnd + ', ' + saturation + '%, ' + lightness + '%, 0.1 )');

var renderRings = function () {
    var i;
    for (i = 0; i < rings; i++) {
        ctx.beginPath();
        ctx.arc(radius, radius, ((radius - (lineWidth / 2)) / rings) * (i + 1), 0, TWO_PI, false);
        ctx.strokeStyle = 'hsla(' + (hueEnd - (i * (hueDiff / rings))) + ', ' + saturation + '%, ' + lightness + '%, 0.1)';
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    };
};




