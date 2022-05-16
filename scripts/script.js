//set default location
var lat;
var lng;
var favoritePlaces = [];

if (localStorage.getItem('location-name') != null) {
    var name = localStorage.getItem('location-name');
    var lat = parseFloat(localStorage.getItem('location-lat'));
    var lng = parseFloat(localStorage.getItem('location-lng'));
}
else {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if(page != 'startup.html') {
        location.href = 'startup.html';
    }
}

//get current location of user
function getLocation(_callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported.")
    }
    _callback();
}

function showPosition(position) {
    console.log("Lat: " + position.coords.latitude + " Lng: " + position.coords.longitude);
    localStorage.setItem('location-lat', position.coords.latitude);
    localStorage.setItem('location-lng', position.coords.longitude);
}

function setLocation() {
    var dropdown = document.getElementById("places");
    
    if(dropdown.options[dropdown.selectedIndex].text != "My Location") {
        var location = JSON.parse(dropdown.value);
        var latNum = parseFloat(location.lat);
        var lngNum = parseFloat(location.lng);

        localStorage.setItem('location-name', dropdown.options[dropdown.selectedIndex].text);
        localStorage.setItem('location-lat', latNum);
        localStorage.setItem('location-lng', lngNum);
    }
    else {
        getLocation(function() {
            console.log('huzzah, I\'m done!');
        });  
        
    }
    window.location.href = 'index.html';
}

//initialize google maps api connection
function initGoogle() {
    var location = {
        lat: lat,
        lng: lng
    };
    var options = {
        center: location,
        zoom: 11,
        disableDefaultUI: true, // a way to quickly hide all controls
        zoomControl: true,
        fullscreenControl: true
    }

    //Draw map centered arround seattle
    map = new google.maps.Map(document.getElementById("map"), options);

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("input"), {
        componentRestrictions: {
            'country': ['us']
        },
        fields: ['geometry', 'name'],
        types: ['establishment']
    })
    
    var darkMode = localStorage.getItem('dark-mode');
    if(darkMode == 'true') {
        turnDark();
    }
    
    //try to fetch browsers array of favorite places
    try {
        favoritePlaces = JSON.parse(localStorage.getItem('favorites'));
        if(favoritePlaces == null) {
            favoritePlaces = [];
        }
    } catch (e) {
        console.log(e.message);
    }
}

var slider = document.getElementById("ratings");
slider.oninput = function () {
    document.getElementById("ratingText").innerHTML = this.value + "+<img src='resources/star.png' id='star'> Rating";
}

var slider2 = document.getElementById("minPrice");
slider2.oninput = function () {
    document.getElementById("minPriceText").innerHTML = "";
    for (let i = 0; i < slider2.value; i++) {
        document.getElementById("minPriceText").innerHTML += "$";
    }
}

function search() {
    retrieveData();
}

function refresh() {
    retrieveData();
}

var markers = []
//add marker to map
function addPin(name, lat, lng) {
    var myLatlng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: myLatlng,
        title: name
    });
    markers.push(marker);
    marker.setMap(map);
    return marker;
}

//remove all markers from map
function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

var place = null;
//called upon hover of place to add a new marker to the map
function nameHover(text) {
    if(place != text.dataset.name) {
        clearMarkers();
        marker = addPin(text.dataset.name, text.dataset.lat, text.dataset.lng);
        map.setCenter(marker.getPosition());
        map.setZoom(15);
    }
    place = text.dataset.name;
}

//clear all search filters
function clearFilters() {
    document.getElementById("filters").innerHTML = "Filters<img src='resources/dropdown-arrow.png' id='arrow'>";
    filterType = null;
    
    document.getElementById("ratings").value = 0;
    document.getElementById("ratingText").innerHTML = "1+<img src='resources/star.png' id='star'> Rating";
    
    document.getElementById("openNow").checked = false;
    
    document.getElementById("minPrice").value = 0;
    document.getElementById("minPriceText").innerHTML = "$";
}

var ul = document.getElementById("filter-list");
var filterType;
//select filter from dropdown
ul.onclick = function (event) {
    var target = getEventTarget(event);
    if(event.target.getAttribute("class") != "disabled") {
        document.getElementById("filters").innerHTML = target.innerHTML;

        var newVal = event.target.getAttribute("value")
        document.getElementById("filters").value = newVal;

        filterType = newVal;
    }
};

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

//refresh page after PDF saved
window.onafterprint = function(){
   location.reload()
}