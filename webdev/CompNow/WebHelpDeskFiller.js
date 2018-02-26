/*
Web Help Desk Helper
Version:	1.0
Author:		Jonathan von Kelaita
*/

// Format:
// NAME-SERIAL-PRODUCT-SPICEWORKS-FAULT

// Add jQuery

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


// Get the HTML element (div) to put our interactive widget in
// var container = document.getElementById("SubmenuContainer");
var container = document.getElementById("subMenuButtons");

// Create a container for our widget
var widgetContainer = document.createElement("div");
//widgetContainer.style = "position: absolute; top: 200px; right: 300px; border: 2px solid; width: 150px; padding: 10px;";
widgetContainer.style = "position: relative; border: 2px solid; width: 150px; padding: 10px; right: -900px; top: 60px;";

// Create button to get data from page
var btnGetData = document.createElement("button");
var btnText = document.createTextNode("Go!");
btnGetData.style = "display: block;";
btnGetData.appendChild(btnText);

// Create input fields
var txtName = document.createElement("input");
txtName.style = "display: block;";

var txtSerial = document.createElement("input");
txtSerial.style = "display: block;";

var txtProduct = document.createElement("input");
txtProduct.style = "display: block;";

var txtSpiceworks = document.createElement("input");
txtSpiceworks.style = "display: block;";

var txtFault = document.createElement("input");
txtFault.style = "display: block;";


// Add all fields to our widgetContainer and append to container
widgetContainer.appendChild(btnGetData);
widgetContainer.appendChild(txtName);
widgetContainer.appendChild(txtSerial);
widgetContainer.appendChild(txtProduct);
widgetContainer.appendChild(txtSpiceworks);
widgetContainer.appendChild(txtFault);

container.appendChild(widgetContainer);

function getWarranty(serialNumber) {
/*	$.ajax({
		url: "https://crossorigin.me/https://datarobot.compnow.com.au/service/warrantycheck.php",
		type: "POST",
		data: {
			serial: serialNumber
		}
	}).done(function(msg) {
		alert(msg);
	});*/


	$.ajax({
		url: "http://datarobot.compnow.com.au/service/warrantycheck.php",

		// The name of the callback parameter, as specified by the YQL service
		jsonp: "callback",

		// Tell jQuery we're expecting JSONP
		dataType: "jsonp",

		// Tell YQL what we want and that we want JSON
		data: {
			serial: "C02QKNGQFVH5",
			format: "json"
		},

		// Work with the response
		success: function(response) {
			console.log(response); // server response
		}
	});
}

function getData() {
	// Get the subject field from which we will extract all the information required
	var subject = document.getElementById("subject").value;
	var arr = subject.split("-");

	// Customer name
	var name = arr[0];
	// Machine serial number
	var serial = arr[1];
	// Product Description
	var product = arr[2];
	// SpiceWorks Ticket Number
	var spiceworks = arr[3];
	// Fault Description
	var fault = arr[4];

	var whd = document.getElementById("clip_button_7_16_0_0_0_0_2_3_0_0_1_2_0_3_0_1_5_5_0_1_3_1_5_0_0_1_16_1_1_12_10").childNodes[1].innerText;

	txtName.value = name;
	txtSerial.value = serial;
	txtProduct.value = product;
	txtSpiceworks.value = spiceworks;
	txtFault.value = fault;

	var quote = "Serial#: " + serial + "\n" +
		"Engineer: JVO\nFault/Reported symptom: " + fault + "\n" +
		"Caller: (" + name + ") Woodleigh School\n" +
		"WHD Ticket#: " + whd + "\n" +
		"Spiceworks Ticket#: " + spiceworks + "\n" +
		"CompNow Warranty expires: ______ (EXCLUDES PHYSICAL / ACCIDENTAL DAMAGE)\n" +
		"Apple Warranty expires: ______\n\n" +
		"Diagnosed on ______ @ ______\n" +
		"Fault description: " + fault + "\n" +
		"Prepared Quote# ______ and emailed to IT Support Team for approval.";

	console.log(quote);

	getWarranty(serial);

}

/*
Serial#: ______
Engineer: JVO
Fault/Reported symptom: ______
Caller: (______) Woodleigh School
WHD Ticket#: ______
Spiceworks Ticket#: ______
CompNow warranty expires: ______ (EXCLUDES PHYSICAL / ACCIDENTAL DAMAGE)
Apple Warranty expires: ______

Diagnosed on ______ @ ______
Fault description: ______
Prepared Quote# ______ and emailed to IT Support Team for approval.
*/

btnGetData.onclick = function() {
	getData();
};
