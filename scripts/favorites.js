//add place to favorites
function favorite(star) {   
    // get data from place
    var placeID = $(star).data('id');
    var name = $(star).data('name');
    var usrRating = $(star).data('rating');
    var address = $(star).data('address');
    var imageURL = $(star).data('preview');
    var url = $(star).data('url');
    var lat = $(star).data('lat');
    var lng = $(star).data('lng');
    var priceLevel = $(star).data('price');
    //create object containting place data
    var place = [placeID, name, usrRating, address, imageURL, url, lat, lng, priceLevel];
    //if favorites list contains place, remove from list             
    if(isFavorited(place)) {
        console.log("Un-Favorited");
        star.src = "resources/not-favorite.png";
        remove(place); //remove place from favorites
    }
    else {
        //add place to favorites and change star image
        console.log("Favorited");
        star.src = "resources/star.png";
        favoritePlaces.push(place);
    }
    saveFavorites(favoritePlaces);
    console.log(favoritePlaces);
}

//list favorited places
function displayFavorites() {
    let mainDIV = document.getElementById('output');
    mainDIV.innerHTML = "<center><button onclick='savePDF()' id='pdf-save'>Save as PDF</button></center>"; // clear mainDIV
    
    //if no places favorited, display message
    if(favoritePlaces == null) {
        mainDIV.innerHTML = "<h1 id='placeholder'>No Favorites Added</h1>";
    }
    else if (favoritePlaces.length == 0){
        mainDIV.innerHTML = "<h1 id='placeholder'>No Favorites Added</h1>";
    }
    else { 
        displayData(favoritePlaces);
    }
    
    //reset scroll position to top
    
    output.scrollTo(0, 0);
}

//check if place is already favorited
function isFavorited(place) {
    if(favoritePlaces != null) {
        for(let i = 0; i < favoritePlaces.length; i++) {
            if(favoritePlaces[i][0] == place[0]) {
                return true;
            }
        }
    }
    return false;
}

//find index of place and remove
function remove(place) {
    for(let i = 0; i < favoritePlaces.length; i++) {
        if(favoritePlaces[i][0] == place[0]) {
            favoritePlaces.splice(i, 1);
        }
    }
}

function savePDF() {
        var headstr = "<html><head><title>Booking Details</title></head><body>";
        var footstr1 = "</";
        var footstr2 = "body>";
        var footstr = footstr1 + footstr2;
        var newstr = document.getElementById('output').innerHTML;
        var oldstr = document.body.innerHTML;
        document.body.innerHTML = headstr + newstr+ footstr;
        window.print();
        document.body.innerHTML = oldstr;
}

function saveFavorites(places) {
    localStorage.setItem('favorites', JSON.stringify(places));
}