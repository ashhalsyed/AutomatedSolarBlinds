var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;


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