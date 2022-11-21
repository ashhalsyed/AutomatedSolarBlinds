function updateSliderAndDisplay() {
    document.getElementById("amount").value = document.getElementById("rangeInput").value;
    document.getElementById("amount").value += "°";
    document.getElementById("on_btn").style.border = "none";
    document.getElementById("off_btn").style.border = "none";
    // BACKEND STARTS HERE

    let currentAngle = Number(document.getElementById("rangeInput").value);
    //variable which holds the current angle value as a number

    console.log(currentAngle);
    //prints the current angle in the console for now

    // BACKEND ENDS HERE

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

    let currentAngle = 0;
    console.log(currentAngle);
}
function opened() {
    document.getElementById("amount").value = "90°";
    document.getElementById("rangeInput").value = 90;
    document.getElementById("on_btn").style.border = "0.25rem solid #95ACBF";
    document.getElementById("off_btn").style.border = "none";

    let currentAngle = 90;
    console.log(currentAngle);
}

function toggleTheme() {
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
    let theme = window.localStorage.getItem('data-theme');
    document.body.style.backgroundColor = theme;
}

function updateSettings() {
    let theme = window.localStorage.getItem('data-theme');

    if (theme == "#121212") {
        document.getElementById("toggle_holder").style.justifyContent = "end";
        document.getElementById("toggle_holder").style.backgroundColor = "#032CA6";
    }
}

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

    let content = document.getElementById("show_calculation");
    let showButton = document.getElementById("show_calculation_button");

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

function updateAngle() {


    document.getElementById("update").style.transition = "transform 1.2s";
    document.getElementById("update").className = 'update rotated';
    window.setTimeout(function () {
        document.getElementById("update").style.transition = "none";
        document.getElementById("update").className = 'update';
    }, 1200);


    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'denied') {
            alert("Location access was declined. Turn on location to use this feature");
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(calcAngle)
    }
    else {
        alert("Geolocation is not supported by this browser")
    }

    function calcAngle(pos) {

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
        console.log(Math.round(optimalAngle));
        document.getElementById("optimal_angle_result_label").innerHTML = Math.round(optimalAngle) + "°";
        document.getElementById("calculation_info_user_date").innerHTML = monthNames[d.getMonth()] + ",  " + d.getDate() + ",  " + d.getFullYear();
        document.getElementById("calculation_info_user_location").innerHTML = pos.coords.latitude;
    }
}
