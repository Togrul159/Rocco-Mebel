const navScroller = function({
    wrapperSelector: wrapperSelector = '.nav-scroller-wrapper',
    selector: selector = '.nav-scroller',
    contentSelector: contentSelector = '.nav-scroller-content',
    buttonLeftSelector: buttonLeftSelector = '.nav-scroller-btn--left',
    buttonRightSelector: buttonRightSelector = '.nav-scroller-btn--right',
    scrollStep: scrollStep = 75
} = {}) {

    let scrolling = false;
    let scrollingDirection = '';
    let scrollOverflow = '';
    let timeout;

    let navScrollerWrapper;

    if (wrapperSelector.nodeType === 1) {
        navScrollerWrapper = wrapperSelector;
    } else {
        navScrollerWrapper = document.querySelector(wrapperSelector);
    }
    if (navScrollerWrapper === undefined || navScrollerWrapper === null) return;

    let navScroller = navScrollerWrapper.querySelector(selector);
    let navScrollerContent = navScrollerWrapper.querySelector(contentSelector);
    let navScrollerLeft = navScrollerWrapper.querySelector(buttonLeftSelector);
    let navScrollerRight = navScrollerWrapper.querySelector(buttonRightSelector);


    // Sets overflow
    const setOverflow = function() {
        scrollOverflow = getOverflow(navScrollerContent, navScroller);
        toggleButtons(scrollOverflow);
    }


    // Debounce setting the overflow with requestAnimationFrame
    const requestSetOverflow = function() {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => {
            setOverflow();
        });
    }


    // Get overflow value on scroller
    const getOverflow = function(content, container) {
        let containerMetrics = container.getBoundingClientRect();
        let containerWidth = containerMetrics.width;
        let containerMetricsLeft = Math.floor(containerMetrics.left);

        let contentMetrics = content.getBoundingClientRect();
        let contentMetricsRight = Math.floor(contentMetrics.right);
        let contentMetricsLeft = Math.floor(contentMetrics.left);

        // Offset the values by the left value of the container
        let offset = containerMetricsLeft;
        containerMetricsLeft -= offset;
        contentMetricsRight -= offset + 1; // Due to an off by one bug in iOS
        contentMetricsLeft -= offset;

        // console.log (containerMetricsLeft, contentMetricsLeft, containerWidth, contentMetricsRight);

        if (containerMetricsLeft > contentMetricsLeft && containerWidth < contentMetricsRight) {
            return 'both';
        } else if (contentMetricsLeft < containerMetricsLeft) {
            return 'left';
        } else if (contentMetricsRight > containerWidth) {
            return 'right';
        } else {
            return 'none';
        }
    }


    // Move the scroller with a transform
    const moveScroller = function(direction) {
        if (scrolling === true) return;

        setOverflow();

        let scrollDistance = scrollStep;
        let scrollAvailable;


        if (scrollOverflow === direction || scrollOverflow === 'both') {

            if (direction === 'left') {
                scrollAvailable = navScroller.scrollLeft;
            }

            if (direction === 'right') {
                let navScrollerRightEdge = navScroller.getBoundingClientRect().right;
                let navScrollerContentRightEdge = navScrollerContent.getBoundingClientRect().right;

                scrollAvailable = Math.floor(navScrollerContentRightEdge - navScrollerRightEdge);
            }

            // If there is less that 1.5 steps available then scroll the full way
            if (scrollAvailable < (scrollStep * 1.5)) {
                scrollDistance = scrollAvailable;
            }

            if (direction === 'right') {
                scrollDistance *= -1;
            }

            navScrollerContent.classList.remove('no-transition');
            navScrollerContent.style.transform = 'translateX(' + scrollDistance + 'px)';

            scrollingDirection = direction;
            scrolling = true;
        }

    }


    // Set the scroller position and removes transform, called after moveScroller()
    const setScrollerPosition = function() {
        var style = window.getComputedStyle(navScrollerContent, null);
        var transform = style.getPropertyValue('transform');
        var transformValue = Math.abs(parseInt(transform.split(',')[4]) || 0);

        if (scrollingDirection === 'left') {
            transformValue *= -1;
        }

        navScrollerContent.classList.add('no-transition');
        navScrollerContent.style.transform = '';
        navScroller.scrollLeft = navScroller.scrollLeft + transformValue;
        navScrollerContent.classList.remove('no-transition');

        scrolling = false;
    }


    // Toggle buttons depending on overflow
    const toggleButtons = function(overflow) {
        navScrollerLeft.classList.remove('active');
        navScrollerRight.classList.remove('active');

        if (overflow === 'both' || overflow === 'left') {
            navScrollerLeft.classList.add('active');
        }

        if (overflow === 'both' || overflow === 'right') {
            navScrollerRight.classList.add('active');
        }
    }


    const init = function() {

        // Determine scroll overflow
        setOverflow();

        // Scroll listener
        navScroller.addEventListener('scroll', () => {
            requestSetOverflow();
        });

        // Resize listener
        window.addEventListener('resize', () => {
            requestSetOverflow();
        });

        // Button listeners
        navScrollerLeft.addEventListener('click', () => {
            moveScroller('left');
        });

        navScrollerRight.addEventListener('click', () => {
            moveScroller('right');
        });

        // Set scroller position
        navScrollerContent.addEventListener('transitionend', () => {
            setScrollerPosition();
        });

    };

    // Init is called by default
    init();


    // Reveal API
    return {
        init
    };
};

const navScrollerTest = navScroller();



// First Slider Start
$('.single-item').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2500
});
// First Slider End

// Production Slider Start
$('.prodSlider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 3.8,
    slidesToScroll: 4,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});
//   Production Start End


// News Slider Start
$('.NewsS').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 2.9,
    slidesToScroll: 4,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});
//   News Start End

// Instagram Slider Start
$('.instagramSlider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});
//   Instagram Start End


// tabbed content
// http://www.entheosweb.com/tutorials/css/tabs.asp
$(".tab_content").hide();
$(".tab_content:first").show();

/* if in tab mode */
$("ul.tabs li").click(function() {

    $(".tab_content").hide();
    var activeTab = $(this).attr("rel");
    $("#" + activeTab).fadeIn();

    $("ul.tabs li").removeClass("active");
    $(this).addClass("active");

    $(".tab_drawer_heading").removeClass("d_active");
    $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

    /*$(".tabs").css("margin-top", function(){ 
       return ($(".tab_container").outerHeight() - $(".tabs").outerHeight() ) / 2;
    });*/
});
$(".tab_container").css("min-height", function() {
    return $(".tabs").outerHeight() + 50;
});
/* if in drawer mode */
$(".tab_drawer_heading").click(function() {

    $(".tab_content").hide();
    var d_activeTab = $(this).attr("rel");
    $("#" + d_activeTab).fadeIn();

    $(".tab_drawer_heading").removeClass("d_active");
    $(this).addClass("d_active");

    $("ul.tabs li").removeClass("active");
    $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
});


/* Extra class "tab_last" 
   to add border to bottom side
   of last tab 
$('ul.tabs li').last().addClass("tab_last");*/