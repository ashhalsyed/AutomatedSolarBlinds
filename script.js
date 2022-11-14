function updateSliderAndDisplay() {
    document.getElementById("amount").value = document.getElementById("rangeInput").value;
    document.getElementById("amount").value += "°";
    document.getElementById("on_btn").style.border = "none";
    document.getElementById("off_btn").style.border = "none";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "75vw";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function closed() {
    document.getElementById("amount").value = "0°";
    document.getElementById("rangeInput").value = 0;
    document.getElementById("off_btn").style.border = "0.25rem solid #95ACBF";
    document.getElementById("on_btn").style.border = "none";
}
function opened() {
    document.getElementById("amount").value = "90°";
    document.getElementById("rangeInput").value = 90;
    document.getElementById("on_btn").style.border = "0.25rem solid #95ACBF";
    document.getElementById("off_btn").style.border = "none";
}

function toggleTheme() {
    var theme = window.localStorage.getItem('data-theme');

    const element = document.querySelector('.toggle_holder');
    const style = getComputedStyle(element);
    const pos = style.justifyContent;
    if (pos == "start") {
        document.getElementById("toggle_holder").style.justifyContent = "end";
        document.body.style.backgroundColor = "#121212";
        document.getElementById("toggle_holder").style.backgroundColor = "#032CA6";
        window.localStorage.setItem('data-theme', '#121212');

    } else {
        document.getElementById("toggle_holder").style.justifyContent = "start";
        document.body.style.backgroundColor = "#FFFFFF";
        document.getElementById("toggle_holder").style.backgroundColor = "#95ACBF";
        window.localStorage.setItem('data-theme', '#FFFFFF');
    }
}

function setTheme() {
    var theme = window.localStorage.getItem('data-theme');
    document.body.style.backgroundColor = theme;
}

function updateSettings() {
    var theme = window.localStorage.getItem('data-theme');

    if (theme == "#121212") {
        document.getElementById("toggle_holder").style.justifyContent = "end";
        document.getElementById("toggle_holder").style.backgroundColor = "#032CA6";
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        alert("Geolocation is not supported by this browser")
    }
}

// function showPosition(position) {
//     document.getElementById("latitude").innerHTML = "Latitude: " + position.coords.latitude;
// }

function calculateAngle() {

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
            alert("Location access was declined. Turn on location to use this feature");
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showAngle);

    }
    else {
        alert("Geolocation is not supported by this browser")
    }
}

function showAngle(position) {
    document.getElementById("latitude").innerHTML = "Your Latitude: " + position.coords.latitude;
    let season = document.getElementById("seasons").value;
    let angle;

    if (season == "Spring" || season == "Fall") {
        angle = position.coords.latitude - 2.5;
    }
    else if (season == "Summer") {
        angle = position.coords.latitude * 0.9 - 23.5;
    }
    else if (season == "Winter") {
        angle = position.coords.latitude * 0.9 + 29;
    }

    document.getElementById("optimal_angle_result_label").innerHTML = Math.round(angle) + "°";
    document.getElementById("latitude").style.color = "red";

}

function showCalculation() {
    // alert("hello");

    var content = document.getElementById("show_calculation");
    var showButton = document.getElementById("show_calculation_button");

    console.log(content.style.display);

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "flex";
        showButton.style.backgroundColor = "#D5E7F2"
        showButton.style.color = "#032CA6"
    } else {
        content.style.display = "none";
        showButton.style.backgroundColor = "#032CA6"
        showButton.style.color = "white"
    }

    content.scrollIntoView();
}