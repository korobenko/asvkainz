'use strict';

function loadMap(element) {
    var myLatlng = new google.maps.LatLng(jQuery(element).data('lat'), jQuery(element).data('lng'));
    var mapOptions = {
        zoom: 17,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(element, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        scrollwheel: false,
        map: map,
        title: 'marker'
    });

    google.maps.event.trigger(map, "resize");
};

jQuery(function() {
    if ( jQuery('#js-map').length ) {
        loadMap(jQuery('#js-map')[0]);
    }
});
