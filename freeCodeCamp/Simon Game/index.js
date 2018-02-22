/* eslint-env browser */

$(document).ready(function() {

	function gameStart() {
		console.log("Game Start");
	}

	function toggleStrict() {
		$("#mode-led").toggleClass("led-on");
	}

	
//	When clicking the power button
	$(".sw-slot").click(function() {
		// toggle switch
		$("#pwr-sw").toggleClass("sw-on");
//		If the power button is off
		if($("#pwr-sw").hasClass("sw-on")==false) {
//			Initialise values and turn off LED display
			$(".count").text("--");
			$(".count").addClass("led-off");
			$("#mode-led").removeClass("led-on");
			$("#mode").off("click");
			$("#start").off("click");
		} else {
//			Power button is on
			$("#mode").click(toggleStrict);
			$("#start").click(gameStart);
			$(".count").removeClass("led-off");
		}
	});


});