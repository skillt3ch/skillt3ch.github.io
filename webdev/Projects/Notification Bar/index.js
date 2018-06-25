function close_notification() {
	var bar = document.getElementById("notification");
	bar.style.background = "rgba(153, 255, 219, 0)";
	bar.style.opacity = 0;
	bar.style.visibility = "hidden";
}

function show_notification() {
	var bar = document.getElementById("notification");
	bar.style.background = "rgba(153, 255, 219, 1)";
	bar.style.opacity = 1;
	bar.style.visibility = "visible";
}