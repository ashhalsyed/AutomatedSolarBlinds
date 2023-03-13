//-----------------BACK END---------------------------
function checkAndUpdateFirebaseAngle() {
    let connected = window.localStorage.getItem("connected");

    if (connected == "true") {
        setFirebaseAngle()
    }
}

function getFirebaseAngle() {
    fetch("https://automated-solar-blinds-default-rtdb.firebaseio.com/angle.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("angle_title_smart").innerHTML = "Angle (Firebase: " + data + ")"
        }
        );

}

function getFirebaseChargingAngle() {
    fetch("https://automated-solar-blinds-default-rtdb.firebaseio.com/optimalAngle.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("optimal_angle_result").innerHTML = data + "°";
        }
        );
}

function getFirebaseChargingAngleWithDelay() {
    fetch("https://automated-solar-blinds-default-rtdb.firebaseio.com/optimalAngle.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("optimal_angle_result").innerHTML = data + "°";
            window.localStorage.setItem("optimalAngle", data)
            window.localStorage.setItem("angle", data)
            setFirebaseAngle()
            updateSmartModeAngle()
        }
        );
}


function setFirebaseAngle() {
    let currentAngle = window.localStorage.getItem("angle")

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: currentAngle
    };
    fetch('https://automated-solar-blinds-default-rtdb.firebaseio.com/angle.json', requestOptions)
    document.getElementById("angle_title_smart").innerHTML = "Angle (Firebase: " + currentAngle + ")"
}

function setFirebaseAngleCharging(angle) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: angle
    };
    fetch('https://automated-solar-blinds-default-rtdb.firebaseio.com/angle.json', requestOptions)
}

function setFirebaseMode(mode) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: '{"currentMode":"' + mode + '"}'
    };
    fetch('https://automated-solar-blinds-default-rtdb.firebaseio.com/mode.json', requestOptions)
}

function setFirebaseChargingFlag() {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: '{"FlagSet":true}'
    };
    fetch('https://automated-solar-blinds-default-rtdb.firebaseio.com/optimalAngleFlag.json', requestOptions)
}

//-----------------FRONT END---------------------------
let appLightBlue = "#D5E7F2";
let appDarkBlue = "#032CA6";
let appGrey = "#95ACBF";
let updateIconAngle = 0
let updatingAngle = false;

function onLoadApp() {

    checkForUpdates()
    updateDeviceConnection()
    updateTheme();

    let currentMode = window.localStorage.getItem("mode")

    if (currentMode == null) {
        window.localStorage.setItem("mode", "smart")
        currentMode = "smart"
    }

    updateMode(currentMode);
}

function toggleConnection() {

    let connected = window.localStorage.getItem("connected");
    let mode = window.localStorage.getItem("mode")
    let chargingAngle = window.localStorage.getItem("chargingAngle")


    if (connected == "true") {
        window.localStorage.setItem("connected", "false");

    }
    else if (connected == "false") {
        let pin = prompt("Please enter the pin")

        if (pin == 3883) {
            window.localStorage.setItem("connected", "true");
            setFirebaseMode(mode)
    
            if (mode == "smart") {
                setFirebaseAngle()
            }
            else if ((mode == "charging" && chargingAngle != null)) {
                setFirebaseAngleCharging(chargingAngle)
            }
                
            }
        else {
            alert("Incorrect Pin")
        }
    }

    updateDeviceConnection()
}

function updateDeviceConnection() {
    let connected = window.localStorage.getItem("connected");

    if (connected == null) {
        window.localStorage.setItem("connected", "false");
        connected = "false";
    }

    if (connected == "true") {
        for (const element of document.getElementsByClassName("connected_icon")) {
            element.classList.add("connected")
        }
    }
    else if (connected == "false") {
        for (const element of document.getElementsByClassName("connected_icon")) {
            element.classList.remove("connected")
        }
    }

}

function checkForUpdates() {
    let latestVersion = "2.30"
    let currentVersion = window.localStorage.getItem("version")

    if (currentVersion == null || currentVersion != latestVersion) {
        window.localStorage.clear()
        window.localStorage.setItem("version", latestVersion)
    }

    document.getElementById("setting_text version").innerHTML = latestVersion
}

function updateMode(mode) {
    if (mode == "smart") {
        getFirebaseAngle()
        updateSmartModeAngle()
        window.localStorage.setItem("mode", "smart")

        document.getElementById("navbar_icon smart").classList.add("selected")
        document.getElementById("navbar_icon_label smart").classList.add("selected")
        document.getElementById("navbar_icon charging").classList.remove("selected")
        document.getElementById("navbar_icon_label charging").classList.remove("selected")
        document.getElementById("navbar_icon settings").classList.remove("selected")
        document.getElementById("navbar_icon_label settings").classList.remove("selected")
        //highlight icon with color

        document.getElementById("smart_content").classList.add("displayed")
        document.getElementById("charging_content").classList.remove("displayed")
        document.getElementById("settings_content").classList.remove("displayed")
        //sets display depending on mode



        let connected = window.localStorage.getItem("connected");

        if (connected == "true") {
            setFirebaseAngle()
            setFirebaseMode(mode)
        }

    }
    else if (mode == "charging") {
        getFirebaseChargingAngle()
        window.localStorage.setItem("mode", "charging")

        document.getElementById("navbar_icon smart").classList.remove("selected")
        document.getElementById("navbar_icon_label smart").classList.remove("selected")
        document.getElementById("navbar_icon charging").classList.add("selected")
        document.getElementById("navbar_icon_label charging").classList.add("selected")
        document.getElementById("navbar_icon settings").classList.remove("selected")
        document.getElementById("navbar_icon_label settings").classList.remove("selected")
        // //highlight icon with color

        document.getElementById("smart_content").classList.remove("displayed")
        document.getElementById("charging_content").classList.add("displayed")
        document.getElementById("settings_content").classList.remove("displayed")
        //sets display depending on mode

        // if (window.localStorage.getItem("chargingAngle")) {
        //     updateAngle();
        // }

        let connected = window.localStorage.getItem("connected");

        if (connected == "true") {
            getFirebaseChargingAngle()
            setFirebaseMode(mode)
        }
    }
    else if (mode == "settings") {
        window.localStorage.setItem("mode", "settings")

        document.getElementById("navbar_icon smart").classList.remove("selected")
        document.getElementById("navbar_icon_label smart").classList.remove("selected")
        document.getElementById("navbar_icon charging").classList.remove("selected")
        document.getElementById("navbar_icon_label charging").classList.remove("selected")
        document.getElementById("navbar_icon settings").classList.add("selected")
        document.getElementById("navbar_icon_label settings").classList.add("selected")
        // //highlight icon with color



        document.getElementById("smart_content").classList.remove("displayed")
        document.getElementById("charging_content").classList.remove("displayed")
        document.getElementById("settings_content").classList.add("displayed")
        //sets display depending on mode

    }

}

function updateSmartModeAngle() {
    let currentAngle = window.localStorage.getItem("angle")

    if (currentAngle == null) {
        window.localStorage.setItem("angle", "0")
        document.getElementById("angle_value").innerHTML = "0°";
        currentAngle = "0"
    }

    document.getElementById("rangeInput").value = currentAngle;
    document.getElementById("angle_value").innerHTML = currentAngle + "°";

    if (currentAngle == "0") {
        document.getElementById("control_button open").classList.remove("selected")
        document.getElementById("control_button closed").classList.add("selected")
    }
    else if (currentAngle == "90") {
        document.getElementById("control_button open").classList.add("selected")
        document.getElementById("control_button closed").classList.remove("selected")
    }
}

function updateSliderAndDisplay() {

    let currentAngle = document.getElementById("rangeInput").value;
    window.localStorage.setItem("angle", currentAngle);


    document.getElementById("angle_value").innerHTML = currentAngle;
    document.getElementById("angle_value").innerHTML += "°";

    document.getElementById("control_button open").classList.remove("selected")
    document.getElementById("control_button closed").classList.remove("selected")

    if (currentAngle == "0") {
        toggleBlinds("closed")
    }
    else if (currentAngle == "90") {
        toggleBlinds("open")
    }
}

function updateChargingAngle() {
    let connected = window.localStorage.getItem("connected")

    if (!updatingAngle && connected == "true") {
        updatingAngle = true;
        updateIconAngle += 360 * 10
        document.getElementById("update").style.transform = "rotate(" + updateIconAngle + "deg)"

        setFirebaseChargingFlag()

        //wait 5 seconds for calibration to complete

        setTimeout(() => {
            getFirebaseChargingAngleWithDelay()
            updatingAngle = false;
        }, 10000);
    }


}

function toggleBlinds(currentState) {
    if (currentState == "closed") {
        document.getElementById("angle_value").innerHTML = "0°";
        document.getElementById("rangeInput").value = 0;
        document.getElementById("control_button open").classList.remove("selected")
        document.getElementById("control_button closed").classList.add("selected")

        window.localStorage.setItem("angle", "0");
    }
    else if (currentState == "open") {
        document.getElementById("angle_value").innerHTML = "90°";
        document.getElementById("rangeInput").value = 90;

        document.getElementById("control_button open").classList.add("selected")
        document.getElementById("control_button closed").classList.remove("selected")

        window.localStorage.setItem("angle", "90");
    }
    checkAndUpdateFirebaseAngle();
}

function toggleTheme() {
    let theme = window.localStorage.getItem("theme");

    if (theme == "user") {
        window.localStorage.setItem("theme", "light");

    }
    else if (theme == "light") {
        window.localStorage.setItem("theme", "dark");

    } else if (theme == "dark") {
        window.localStorage.setItem("theme", "user");
    }

    updateTheme();
}

function setLightTheme() {
    for (const element of document.querySelectorAll('body, body *')) {
        element.classList.remove("dark")
    }
}

function setDarkTheme() {
    for (const element of document.querySelectorAll('body, body *')) {
        element.classList.add("dark")
    }
}

function updateTheme() {
    let theme = window.localStorage.getItem("theme");

    if (theme == null) {
        window.localStorage.setItem("theme", "user");
        theme = "user";
        //default theme
    }

    if (theme == "user") {
        document.getElementById("setting_text theme").innerHTML = "System Theme"
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
            setDarkTheme()
        }
        else {
            setLightTheme()
        }
    }
    else if (theme == "light") {
        document.getElementById("setting_text theme").innerHTML = "Light"
        setLightTheme()
    }
    else if (theme == "dark") {
        document.getElementById("setting_text theme").innerHTML = "Dark"
        setDarkTheme()
    }
}

function showCalculation() {
    document.getElementById("show_calculation_button").classList.toggle("displayed")
    document.getElementById("show_calculation").classList.toggle("displayed")
    document.getElementById("show_calculation").scrollIntoView();
}

function updateAngle() {

    updateIconAngle += 360
    document.getElementById("update").style.transform = "rotate(" + updateIconAngle + "deg)"

    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
            alert("Location access was declined. Turn on location to use this feature");
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(calculateOptimalAngle)
    }
    else {
        alert("Geolocation is not supported by this browser")
    }

    function calculateOptimalAngle(pos) {

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

        optimalAngle = Math.round(optimalAngle)

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        document.getElementById("optimal_angle_result").innerHTML = optimalAngle + "°";
        document.getElementById("calculation_info_user_date").innerHTML = monthNames[d.getMonth()] + ",  " + d.getDate() + ",  " + d.getFullYear();
        document.getElementById("calculation_info_user_location").innerHTML = pos.coords.latitude;

        window.localStorage.setItem("chargingAngle", optimalAngle)

        let connected = window.localStorage.getItem("connected");

        if (connected == "true") {
            setFirebaseAngleCharging(optimalAngle)
        }
    }
}
//above function not used

function goToVersionInfo() {
    window.open("https://github.com/ashhalsyed/AutomatedSolarBlinds", '_blank').focus();
}

function clearLocalStorage() {
    if (confirm('This will clear all app data (angle, theme, etc.)')) {
        window.localStorage.clear();
        window.location.reload();
    }
}
