'use strict';

var Header = {

    init: function() {
        this.fixed();
        this.events();
    },

    fixed: function() {
        jQuery('body').css('paddingTop', jQuery('.header').outerHeight() + 'px');
    },

    events: function() {
        if (!is_mobile) {
            $(window).on('resize', function() {
                Header.fixed();
            });
        } else {
            $(window).on('orientationchange', function() {
                setTimeout(function() {
                    Header.fixed();
                }, 500);
            });
        }
    }

};
