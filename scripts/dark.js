var darkMode = false;
function toggleColors() {
    //toggle light mode
    if(darkMode) {
        turnLight();
    } 
    //toggle dark mode
    else {
        turnDark();
    }
    console.log("Dark Mode Enabled: " + darkMode);
}

function turnLight() {
    document.documentElement.style.setProperty('--primcolor', 'black');
    document.documentElement.style.setProperty('--textcolor', 'black'); //#424245
    document.documentElement.style.setProperty('--backgroundcolor', '#ffffff');
    document.documentElement.style.setProperty('--shadowcolor', 'transparent');
    document.getElementById("magnifying-glass").src = "resources/magnifying-glass-dark.png";
    document.getElementById("refresh").src = "resources/refresh.png";
    document.getElementById("clear").src = "resources/clear-filters.png";
    document.getElementById("toggleColors").src = "resources/light-mode.png";
    document.getElementById("arrow").src = "resources/dropdown-arrow.png";
    document.getElementById("magnifying-glass").src = "resources/magnifying-glass.png"

    var myStyle =[{}];
    map.setOptions({styles: myStyle});

    darkMode = false;
    localStorage.setItem('dark-mode', 'false');
}

function turnDark() {
    document.documentElement.style.setProperty('--primcolor', '#102A43');
    document.documentElement.style.setProperty('--textcolor', '#D9E2DC');
    document.documentElement.style.setProperty('--backgroundcolor', '#121212');
    document.documentElement.style.setProperty('--shadowcolor', '#1f1f1f');
    document.getElementById("magnifying-glass").src = "resources/magnifying-glass-dark.png";
    document.getElementById("refresh").src = "resources/refresh-dark.png";
    document.getElementById("clear").src = "resources/clear-filters-dark.png";
    document.getElementById("toggleColors").src = "resources/dark-mode.png";
    document.getElementById("arrow").src = "resources/dropdown-arrow-dark.png";
    document.getElementById("magnifying-glass").src = "resources/magnifying-glass-dark.png"

    var myStyle =[
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#D9E2DC" }] },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#D9E2DC" }],
        },
        {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#D9E2DC" }],
        },
        {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
        },
        {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#575757" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
        },
        {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#D9E2DC" }],
        },
        {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
        },
        {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#D9E2DC" }],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#102A43" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
        },
    ];
    map.setOptions({styles: myStyle});

    darkMode = true;
    localStorage.setItem('dark-mode', 'true');
}

function darkReadMe() {
    if (localStorage.getItem('dark-mode') == 'true') {
        document.documentElement.style.setProperty('--primcolor', '#102A43');
        document.documentElement.style.setProperty('--textcolor', '#D9E2DC');
        document.documentElement.style.setProperty('--backgroundcolor', '#121212');
        document.documentElement.style.setProperty('--shadowcolor', '#1f1f1f');
        document.getElementById("toggleColors").src = "resources/dark-mode.png";
    }
    else {
        document.documentElement.style.setProperty('--primcolor', '#424242');
        document.documentElement.style.setProperty('--textcolor', '#bdbdbd');
        document.documentElement.style.setProperty('--backgroundcolor', '#fafafa');
        document.documentElement.style.setProperty('--shadowcolor', '#1f1f1f');
        document.getElementById("toggleColors").src = "resources/light-mode.png";
    }
}

function updateReadMe() {
    if (localStorage.getItem('dark-mode') == 'true') {
        localStorage.setItem('dark-mode', 'false');
    }
    else {
        localStorage.setItem('dark-mode', 'true'); 
    }
    darkReadMe();
}