//retrieve places from Google places API
function retrieveData() {
    var places = [];
    var img = document.createElement("img");
    
    //set center location
    var myLocation = new google.maps.LatLng(lat, lng);
    
    var radius = 5000; //set radius from center to pull data from
    //set minimum price from HTML element
    var minPrice = document.getElementById("minPrice").value;
    if(minPrice == 1) {
        minPrice = null;
    }
    //set currently open boolean from HTML element
    var openNow = document.getElementById("openNow").checked;
    if(openNow == false) {
        openNow = null;
    }
    //get search keywaord from searchbar
    var keyword = document.getElementById("searchBar").value;
    //set filter type from dropdown
    var type = filterType;
    console.log(type);
    if(type == "Filters") {
        type = null;
    }
    //create request object with filters
    var requestObj = {
        location: myLocation,
        radius: radius,
        type: type,
        keyword: keyword,
        minPriceLevel: minPrice,
        openNow: openNow
    };
    
    //create nearby search using Google places service
    var service = new google.maps.places.PlacesService(document.getElementById('output'));
    service.nearbySearch(requestObj, function(results, status) {
        console.log('Retrieved data:');
        console.log(results);

        let mainDIV = document.getElementById('output');
        //loop through each places
        for (let i = 0; i < results.length; i++) {
            //filter search criteria
            //if (results[i]['name'].toLowerCase().includes(document.getElementById("searchBar").value.toLowerCase())) {
                //filter by rating if specified
                if(results[i]['rating'] > document.getElementById("ratings").value) {
                    //weed out non useful resullts
                    if (results[i]['rating'] != undefined) {
                        try {
                            //store data that i'm going to use
                            placeID = results[i]['place_id'];
                            usrRating = results[i]['rating'];
                            name = results[i]['name'];
                            lat = results[i]['geometry']['location'].lat();
                            lng = results[i]['geometry']['location'].lng();
                            address = results[i]['vicinity'];
                            imageURL = results[i].photos[0].getUrl({
                                'maxWidth': 400,
                                'maxHeight': 200
                            });
                            url = "https://www.google.com/maps/search/?api=1&query="+lat+"%2C"+lng+"&query_place_id="+placeID;
                            priceLevel = results[i]['price_level'];
                            
                            //create place object with all data to eventually display
                            place = [placeID, name, usrRating, address, imageURL, url, lat, lng, priceLevel];
                            
                            //add this place to places array
                            places.push(place); 
                        } catch (e) {
                            //catch all errors
                            console.log(e.message);
                        }
                    }
                }
            /*}*/
        }
        //call function to display all of the places we just got
        displayData(places);
    });
    console.log(places);
}
