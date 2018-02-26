function changeRGB() {
    var r = document.getElementById("slideRed").value;
    var g = document.getElementById("slideGreen").value;
    var b = document.getElementById("slideBlue").value;

    document.getElementById("valRed").innerHTML = r;
    document.getElementById("valGreen").innerHTML = g;
    document.getElementById("valBlue").innerHTML = b;

    var col = "rgb(" + r + "," + g + "," + b + ")";

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    document.getElementById("luma").innerHTML = parseInt(luma);

    document.getElementById("sliders").style.backgroundColor = col;

    var d = document.getElementsByTagName("div");

    if (luma < 80) {    
        for (var i = 0; i < d.length; i++) {
            d[i].style.color = "#ffffff";
        }
    } else {
        for (var i = 0; i < d.length; i++) {
            d[i].style.color = "#000000";
        }
    }
}