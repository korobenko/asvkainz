'use strict';

var ScrollSpy = {

    scrollStop: false,
    navbar: '#navbar',
    mass: {},

    init: function() {
        setTimeout(function () {
            ScrollSpy.createOffsets();
            ScrollSpy.events();
        }, 500);
    },

    createOffsets: function() {
        jQuery(ScrollSpy.navbar).find('ul li').each(function(index, element) {
            var $this = jQuery(element),
                element = jQuery($this.data('id'));

            if (element.length) {
                ScrollSpy.mass[$this.data('id')] = element.offset().top - jQuery('.header').outerHeight() - 30;
            }
        });
    },

    scroll: function() {
        if (ScrollSpy.scrollStop) {
            return false;
        }

        var pos = jQuery(document).scrollTop() + jQuery(window).height() - jQuery('.header').outerHeight();

        for (var key in ScrollSpy.mass) {
            if ( pos >= ScrollSpy.mass[key]) {
                jQuery(ScrollSpy.navbar).find('ul li').removeClass('active');
                jQuery(ScrollSpy.navbar).find('[data-id="'+key+'"]').addClass('active');
            }
        }
    },

    events: function() {
        jQuery(ScrollSpy.navbar).find('a').not('[data-link]').click(function( event ) {
            event.preventDefault();

            var $this = jQuery(this),
                top = ScrollSpy.mass[$this.closest('li').data('id')];

            ScrollSpy.scrollStop = true;

            jQuery('html,body').animate({
                'scrollTop' : top
            },500, function() {
                $this.closest('ul').find('li').removeClass('active');
                $this.closest('li').addClass('active');
                setTimeout(function() {
                    ScrollSpy.scrollStop = false;
                }, 300);
            });
        });

        jQuery(document).scroll(function() {
            ScrollSpy.scroll();
        });

        if (!is_mobile) {
            $(window).on('resize', function() {
                ScrollSpy.createOffsets();
            });
        } else {
            $(window).on('orientationchange', function() {
                setTimeout(function() {
                    ScrollSpy.createOffsets();
                }, 500);
            });
        }
    }

};
