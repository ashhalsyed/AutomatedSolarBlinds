function connectToBackend() {
    //called every time the user changes the angle

    let currentAngle = window.localStorage.getItem("angle")
    //saves current angle in a variable

    console.log(Number(currentAngle));
    //prints the current angle in the console for now (F12 -> Console)

}

//-----------------Everything below is for the frontend---------------------------
let appLightBlue = "#D5E7F2";
let appDarkBlue = "#032CA6";
let appGrey = "#95ACBF";

function onLoadApp() {
    let currentMode = window.localStorage.getItem("mode")

    if (currentMode == null) {
        window.localStorage.setItem("mode", "smart")
        currentMode = "smart"
    }

    updateTheme();
    updateMode(currentMode);
    updateSmartModeAngle();
}

function updateMode(mode) {

    if (mode == "smart") {
        window.localStorage.setItem("mode", "smart")

        document.getElementById("navbar_icon smart").style.fill = appDarkBlue;
        document.getElementById("navbar_icon_label smart").style.color = appDarkBlue;
        document.getElementById("navbar_icon_label smart").style.fontWeight = "bold";
        //highlight icon with color

        document.getElementById("navbar_icon charging").style.fill = "black";
        document.getElementById("navbar_icon_label charging").style.color = "black";
        document.getElementById("navbar_icon_label charging").style.fontWeight = "normal";
        document.getElementById("navbar_icon settings").style.fill = "black";
        document.getElementById("navbar_icon_label settings").style.color = "black";
        document.getElementById("navbar_icon_label settings").style.fontWeight = "normal";
        //reset other colors

        document.getElementById("smart_content").style.display = "flex";
        document.getElementById("charging_content").style.display = "none";
        document.getElementById("settings_content").style.display = "none";
        //sets display depending on mode

    }
    else if (mode == "charging") {
        window.localStorage.setItem("mode", "charging")


        document.getElementById("navbar_icon charging").style.fill = appDarkBlue;
        document.getElementById("navbar_icon_label charging").style.color = appDarkBlue;
        document.getElementById("navbar_icon_label charging").style.fontWeight = "bold";
        //highlight icon with color

        document.getElementById("navbar_icon smart").style.fill = "black";
        document.getElementById("navbar_icon_label smart").style.color = "black";
        document.getElementById("navbar_icon_label smart").style.fontWeight = "normal";
        document.getElementById("navbar_icon settings").style.fill = "black";
        document.getElementById("navbar_icon_label settings").style.color = "black";
        document.getElementById("navbar_icon_label settings").style.fontWeight = "normal";
        //reset other colors

        document.getElementById("smart_content").style.display = "none";
        document.getElementById("charging_content").style.display = "flex";
        document.getElementById("settings_content").style.display = "none";
        //sets display depending on mode
    }
    else if (mode == "settings") {
        window.localStorage.setItem("mode", "settings")


        document.getElementById("navbar_icon settings").style.fill = appDarkBlue;
        document.getElementById("navbar_icon_label settings").style.color = appDarkBlue;
        document.getElementById("navbar_icon_label settings").style.fontWeight = "bold";
        //highlight icon with color

        document.getElementById("navbar_icon smart").style.fill = "black";
        document.getElementById("navbar_icon_label smart").style.color = "black";
        document.getElementById("navbar_icon_label smart").style.fontWeight = "normal";
        document.getElementById("navbar_icon charging").style.fill = "black";
        document.getElementById("navbar_icon_label charging").style.color = "black";
        document.getElementById("navbar_icon_label charging").style.fontWeight = "normal";
        //reset other colors

        document.getElementById("smart_content").style.display = "none";
        document.getElementById("charging_content").style.display = "none";
        document.getElementById("settings_content").style.display = "flex";
        //sets display depending on mode

    }
}

function updateSmartModeAngle() {
    let currentAngle = window.localStorage.getItem("angle")

    if (currentAngle == null) {
        window.localStorage.setItem("angle", "0")
    }
    else {
        document.getElementById("rangeInput").value = currentAngle;
        document.getElementById("amount").value = currentAngle;
        document.getElementById("amount").value += "°";

        if (currentAngle == "0") {
            fakeToggleBlinds("closed")
        }
        else if (currentAngle == "90") {
            fakeToggleBlinds("open")
        }

    }
}

function updateSliderAndDisplay() {

    let currentAngle = document.getElementById("rangeInput").value;
    window.localStorage.setItem("angle", currentAngle);


    document.getElementById("amount").value = currentAngle;
    document.getElementById("amount").value += "°";
    document.getElementById("control_button open").style.backgroundColor = appDarkBlue;
    document.getElementById("control_button open").style.color = "white";
    document.getElementById("control_button closed").style.backgroundColor = appDarkBlue;
    document.getElementById("control_button closed").style.color = "white";

    if (currentAngle == "0") {
        toggleBlinds("closed")
    }
    else if (currentAngle == "90") {
        toggleBlinds("open")
    }
    else {
        connectToBackend();
    }
}

function fakeToggleBlinds(currentState) {
    if (currentState == "closed") {
        document.getElementById("amount").value = "0°";
        document.getElementById("rangeInput").value = 0;
        document.getElementById("control_button open").style.backgroundColor = appDarkBlue;
        document.getElementById("control_button open").style.color = "white";
        document.getElementById("control_button closed").style.backgroundColor = appLightBlue;
        document.getElementById("control_button closed").style.color = appDarkBlue;

        window.localStorage.setItem("angle", "0");
    }
    else if (currentState == "open") {
        document.getElementById("amount").value = "90°";
        document.getElementById("rangeInput").value = 90;
        document.getElementById("control_button open").style.backgroundColor = appLightBlue;
        document.getElementById("control_button open").style.color = appDarkBlue;
        document.getElementById("control_button closed").style.backgroundColor = appDarkBlue;
        document.getElementById("control_button closed").style.color = "white";

        window.localStorage.setItem("angle", "90");
    }
}

function toggleBlinds(currentState) {
    if (currentState == "closed") {
        document.getElementById("amount").value = "0°";
        document.getElementById("rangeInput").value = 0;
        document.getElementById("control_button open").style.backgroundColor = appDarkBlue;
        document.getElementById("control_button open").style.color = "white";
        document.getElementById("control_button closed").style.backgroundColor = appLightBlue;
        document.getElementById("control_button closed").style.color = appDarkBlue;

        window.localStorage.setItem("angle", "0");
    }
    else if (currentState == "open") {
        document.getElementById("amount").value = "90°";
        document.getElementById("rangeInput").value = 90;
        document.getElementById("control_button open").style.backgroundColor = appLightBlue;
        document.getElementById("control_button open").style.color = appDarkBlue;
        document.getElementById("control_button closed").style.backgroundColor = appDarkBlue;
        document.getElementById("control_button closed").style.color = "white";

        window.localStorage.setItem("angle", "90");
    }
    connectToBackend();
}

function toggleTheme() {
    let theme = window.localStorage.getItem("theme");

    if (theme == "white") {
        window.localStorage.setItem("theme", "black");
    }
    else if (theme == "black") {
        window.localStorage.setItem("theme", "white");
    }

    updateTheme();
}

function updateTheme() {
    let theme = window.localStorage.getItem("theme");

    if (theme == null) {
        window.localStorage.setItem("theme", "white");
        theme = "white";
    }

    if (theme == "white") {
        document.getElementById("toggle_holder").style.justifyContent = "start";
        document.getElementById("toggle_holder").style.backgroundColor = appGrey;
        document.getElementById("navbar").style.backgroundColor = "white";


    }
    else if (theme == "black") {
        document.getElementById("toggle_holder").style.justifyContent = "end";
        document.getElementById("toggle_holder").style.backgroundColor = appDarkBlue;
        document.getElementById("navbar").style.backgroundColor = appLightBlue;
    }
    document.body.style.backgroundColor = theme;
}

function showCalculation() {

    let content = document.getElementById("show_calculation");
    let showButton = document.getElementById("show_calculation_button");

    if (content.style.display == "none" || content.style.display == "") {
        content.style.display = "flex";
        showButton.style.backgroundColor = appLightBlue
        showButton.style.color = appDarkBlue
        content.scrollIntoView();
    } else {
        content.style.display = "none";
        showButton.style.backgroundColor = appDarkBlue
        showButton.style.color = "white"
        document.getElementById("charging_content").scrollTop = 0;
    }


}

function updateAngle() {

    document.getElementById("update").style.transition = "transform 1.2s";
    document.getElementById("update").className.baseVal = 'update rotated';
    window.setTimeout(function () {
        document.getElementById("update").style.transition = "none";
        document.getElementById("update").className.baseVal = 'update';
    }, 1200);


    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
            alert("Location access was declined. Turn on location to use this feature");
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(logPos)
    }
    else {
        alert("Geolocation is not supported by this browser")
    }

    function logPos(pos) {

        const d = new Date();

        let currentMonth = d.getMonth() + 1;
        let optimalAngle;
        let hemisphere = pos.coords.latitude >= 0 ? "northern" : "southern";
        let springAndAutumnAngle = pos.coords.latitude - 2.5;
        let summerAngle = pos.coords.latitude * 0.9 - 23.5;
        let winterAngle = pos.coords.latitude * 0.9 + 29;


        //indexes at 0
        if (hemisphere == "northern") {
            switch (currentMonth) {
                case 12:
                    optimalAngle = winterAngle + ((springAndAutumnAngle - winterAngle) / 3);
                    break;
                case 1:
                    optimalAngle = winterAngle + 2 * ((springAndAutumnAngle - winterAngle) / 3);
                    break;
                case 2:
                    optimalAngle = springAndAutumnAngle;
                    //spring
                    break;
                case 3:
                    optimalAngle = springAndAutumnAngle + ((summerAngle - springAndAutumnAngle) / 3);
                    break;
                case 4:
                    optimalAngle = springAndAutumnAngle + 2 * ((summerAngle - springAndAutumnAngle) / 3)
                    break;
                case 5:
                    optimalAngle = summerAngle;
                    //summer
                    break;
                case 6:
                    optimalAngle = summerAngle + ((springAndAutumnAngle - summerAngle) / 3);
                    break;
                case 7:
                    optimalAngle = summerAngle + 2 * ((springAndAutumnAngle - summerAngle) / 3);
                    break;
                case 8:
                    optimalAngle = springAndAutumnAngle;
                    //autumn
                    break;
                case 9:
                    optimalAngle = springAndAutumnAngle + ((winterAngle - springAndAutumnAngle) / 3);
                    break;
                case 10:
                    optimalAngle = springAndAutumnAngle + 2 * ((winterAngle - springAndAutumnAngle) / 3);
                    break;
                case 11:
                    optimalAngle = winterAngle;
                    //winter
                    break;
            }
        }
        else {
            switch (currentMonth) {
                case 12:
                    optimalAngle = summerAngle + ((springAndAutumnAngle - summerAngle) / 3);
                    break;
                case 1:
                    optimalAngle = summerAngle + 2 * ((springAndAutumnAngle - summerAngle) / 3);
                    break;
                case 2:
                    optimalAngle = springAndAutumnAngle;
                    //autumn
                    break;
                case 3:
                    optimalAngle = springAndAutumnAngle + ((winterAngle - springAndAutumnAngle) / 3);
                    break;
                case 4:
                    optimalAngle = springAndAutumnAngle + 2 * ((winterAngle - springAndAutumnAngle) / 3);
                    break;
                case 5:
                    optimalAngle = winterAngle;
                    //winter
                    break;
                case 6:
                    optimalAngle = winterAngle + ((springAndAutumnAngle - winterAngle) / 3);
                    break;
                case 7:
                    optimalAngle = winterAngle + 2 * ((springAndAutumnAngle - winterAngle) / 3);
                    break;
                case 8:
                    optimalAngle = springAndAutumnAngle;
                    //spring
                    break;
                case 9:
                    optimalAngle = springAndAutumnAngle + ((summerAngle - springAndAutumnAngle) / 3);
                    break;
                case 10:
                    optimalAngle = springAndAutumnAngle + 2 * ((summerAngle - springAndAutumnAngle) / 3);
                    break;
                case 11:
                    optimalAngle = summerAngle;
                    //summer
                    break;
            }
        }

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        document.getElementById("optimal_angle_result").innerHTML = Math.round(optimalAngle) + "°";
        document.getElementById("calculation_info_user_date").innerHTML = monthNames[d.getMonth()] + ",  " + d.getDate() + ",  " + d.getFullYear();
        document.getElementById("calculation_info_user_location").innerHTML = pos.coords.latitude;

        window.localStorage.setItem("chargingAngle", optimalAngle)
    }
}