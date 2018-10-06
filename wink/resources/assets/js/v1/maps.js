var placeSearch,
autocomplete,
latitude = -33.9248685,
longitude = 18.424055299999964,
map,
marker;

var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    sublocality_level_2: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'short_name',
    postal_code: 'short_name'
};

function checkExistingGPS() {

    if (document.getElementById("latitude") !== null) {
        currentlatitude = parseFloat(document.getElementById("latitude").value);
        currentlongitude = parseFloat(document.getElementById("longitude").value);
    }else{
        currentlatitude = -33.872;
        currentlongitude = 18.4311;
    }

    if (!isNaN(currentlatitude) && !isNaN(currentlongitude)) {
        initMap(currentlatitude, currentlongitude, 12);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                initMap(position.coords.latitude, position.coords.longitude, 17);
            }, function (err) {
                initMap(latitude, longitude, 8);
            });
        } else {
            initMap(latitude, longitude, 8);
        }
    }


};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')));

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
    // checkExistingGPS();
}

function fillInAddress() {

    $('#submit_location').attr('disabled','disabled');

    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }

    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();

    document.getElementById("latitude").value = place.geometry.location.lat();
    document.getElementById("longitude").value = place.geometry.location.lng();

//    initMap(longitude, latitude, 17);
map.panTo(new google.maps.LatLng(latitude, longitude));
marker.setMap(null);

var listener = google.maps.event.addListener(map, "idle", function() {
    map.setZoom(18);
    google.maps.event.removeListener(listener);
});

marker2 = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    draggable:true,
    map: map
});

google.maps.event.addListener(marker2, 'dragend', function()
{

    var latLng  = marker2.getPosition();
    document.getElementById("latitude").value = latLng.lat();
    document.getElementById("longitude").value = latLng.lng();
    geocodePosition(marker2.getPosition());

});

function geocodePosition(pos)
{

    geocoder = new google.maps.Geocoder();
    geocoder.geocode
    ({
        latLng: pos
    },
    function(results, status)
    {

        if (status == google.maps.GeocoderStatus.OK)
        {
            $("#autocomplete").val(results[0].formatted_address);
        }
        else
        {
            alert('Cannot determine address at this location.'+status);
        }
    }
    );
}

$('#submit_location').removeAttr('disabled');
}

function initMap(latitude, longitude, zoom) {

    var mapDiv = document.getElementById('location-map');

    map = new google.maps.Map(mapDiv, {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: zoom
    });

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        draggable:true,
        animation: google.maps.Animation.DROP,
    });

    google.maps.event.addListener(marker, 'dragend', function()
    {
        var latLng  = marker.getPosition();
        document.getElementById("latitude").value = latLng.lat();
        document.getElementById("longitude").value = latLng.lng();
        geocodePosition(marker.getPosition());

    });

    function geocodePosition(pos)
    {

        geocoder = new google.maps.Geocoder();
        geocoder.geocode
        ({
            latLng: pos
        },
        function(results, status)
        {

            if (status == google.maps.GeocoderStatus.OK)
            {
                $("#autocomplete").val(results[0].formatted_address);
            }
            else
            {
                alert('Cannot determine address at this location.'+status);
            }
        }
        );
    }
}

function initSubmissionMap(latvar, longvar) {
  var myLatLng = {lat: larvar, lng: longvar};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
});

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map
});
}
