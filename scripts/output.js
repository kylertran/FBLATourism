//initialize variables
var locations = {};
var favoritePlaces = [];
function displayData(places) {
    var img = document.createElement("img");
    
    locations.favorite = places;
    let mainDIV = document.getElementById('output');
    
    //loop through places array
    if(places.length == 0) {
        mainDIV.innerHTML = "<h1 id='placeholder'>No Results</h1>";
    }
    
    for(let i = 0; i < places.length; i++) {
        place = places[i];
        
        //insert name of place into HTML
        mainDIV.innerHTML += "<h2><span class='names' data-name='"+place[1]+"' data-lat='"+place[6]+"' data-lng='"+place[7]+"' onmouseover='nameHover(this)'>" + place[1] + "</span></h2>";
        
        //insert preview image & address into HTML 
        mainDIV.innerHTML += "<div id='hoverable' data-name='"+place[1]+"' data-lat='"+place[6]+"' data-lng='"+place[7]+"' onmouseover='nameHover(this)'><p><img src=" + place[4] + " style='float: left;' id='preview'><a id='addy' target='_blank' href="+place[5]+"><img src='resources/location.png' id='address'>" + place[3] + "</p></div>";
        
        //if place is favorited, change star img
        if(isFavorited(place)) {
            starIMG = "resources/star.png";
        }
        else {
            starIMG = "resources/not-favorite.png";
        }
        
        //insert favorites button into HTML
        mainDIV.innerHTML += "<img src='"+starIMG+"' class='favorite' onclick='favorite(this)' data-id='"+place[0]+"' data-name='"+place[1]+"' data-rating='"+place[2]+"' data-address='"+place[3]+"' data-preview='"+place[4]+"' data-url='"+place[5]+"' data-lat='"+place[6]+"' data-lng='"+place[7]+"' data-price='"+place[8]+"'>";
        
        //place = [placeID, name, usrRating, address, imageURL, url, lat, lng, priceLevel];
        
        //insert place rating into HTML
        mainDIV.innerHTML += "<div id='hoverable' data-name='"+place[1]+"' data-lat='"+place[6]+"' data-lng='"+place[7]+"' onmouseover='nameHover(this)'><p>User Rating: " + place[2] + " / 5<img src='resources/star.png' id='star'></div>";
        
        //determine and inject price level into HTML
        if(place[8] == 5) {
            mainDIV.innerHTML += "<p>Price Level: $$$$$</p>";
        }
        else if(place[8] == 4) {
            mainDIV.innerHTML += "<p>Price Level: $$$$</p>";
        }
        else if(place[8] == 3) {
            mainDIV.innerHTML += "<p>Price Level: $$$</p>";
        }
        else if(place[8] == 2) {
            mainDIV.innerHTML += "<p>Price Level: $$</p>";
        }
        else if(place[8] == 1) {
            mainDIV.innerHTML += "<p>Price Level: $</p>";
        }
    }
}