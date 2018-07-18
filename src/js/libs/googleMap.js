// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 17,
        zoomControl: false,
        scrollwheel: false,
        scaleControl: false,
        rotateControl: false,
        panControl: false,
        mapMaker: false,
        disableDefaultUI: false,
        streetViewControl: false,
        signInControl: false,
        mapTypeControl: false,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(54.321009, 48.393691), // New York

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{"stylers":[{"saturation":-100},{"gamma":0.8},{"lightness":4},{"visibility":"on"}]},{"featureType":"landscape.natural","stylers":[{"visibility":"on"},{"color":"#5dff00"},{"gamma":4.97},{"lightness":-5},{"saturation":100}]}]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);


    var neighborhoods = [
        // Main
        {lat: 56.9472687, lng: 24.108269, title: 'Title 1', content: 'Text text text', icon: 'map-pin.png'},
        {lat: 56.9473097, lng: 24.1101143, title: 'Title 2', content: 'Text text text2', icon: 'map-pin.png'},
        {lat: 56.9472896, lng: 24.110705, title: 'Title 3', content: 'Text text text3', icon: 'map-pin.png'},
    ];

    /* Info windows
    =========================*/
    infoWindow = new google.maps.InfoWindow();

/*
    function displayMarkers() {

       // this variable sets the map bounds and zoom level according to markers position
       var bounds = new google.maps.LatLngBounds();

       // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
       for (var i = 0; i < neighborhoods.length; i++){

          var latlng = new google.maps.LatLng(neighborhoods[i].lat, neighborhoods[i].lng);
          var name = neighborhoods[i].title;
          var icon = neighborhoods[i].icon;
          var content = neighborhoods[i].content;

          createMarker(latlng, name, content, icon, i * 250);

          // Marker’s Lat. and Lng. values are added to bounds variable
          bounds.extend(latlng);
       }

    }


    function createMarker(latlng, title, content, icon, timeout) {

        window.setTimeout(function() {
           var marker = new google.maps.Marker({
              map: map,
              position: latlng,
              clickable: true,
              icon: {
                url: "i/" + icon
              },
              animation: google.maps.Animation.DROP
           });

           google.maps.event.addListener(marker, 'click', function() {
              var infoContent = '<div id="info_container">' +
              '<h3 class="info_title">' + title + '</h3><div>' + content + '</div></div>';

              infoWindow.setContent(infoContent);
              infoWindow.open(map, marker);

           });

        }, timeout);

    }

    displayMarkers();


*/

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(54.320746, 48.391193),
                    map: map,
                    title: 'Snazzy!',
                });


    // Enable scroll zoom after click on map
    map.addListener('click', function() {
       map.setOptions({
           scrollwheel: true
       });
    });


    // Enable scroll zoom after drag on map
    map.addListener('drag', function() {
       map.setOptions({
           scrollwheel: true
       });
    });


    // Disable scroll zoom when mouse leave map
    map.addListener('mouseout', function() {
       map.setOptions({
           scrollwheel: false
       });
    });


    /* Map center on resize
    =========================*/
    var getCen = map.getCenter();

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(getCen);
    });



}
