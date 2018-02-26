// ==UserScript==
// @name        GSX Customer AutoFill
// @namespace   http://localhost
// @description Auto fill customer's details in GSX
// @include     https://gsxapp.apple.com/WebApp/createrepair.htm
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require https://code.jquery.com/ui/1.12.1/jquery-ui.js
// ==/UserScript==
// Automatically fill out customer's details in GSX
// getElementById

var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var company = document.getElementById('company');
var phone = document.getElementById('phone');
var email = document.getElementById('email');
var address1 = document.getElementById('address1');
var address2 = document.getElementById('address2');
var address3 = document.getElementById('address3');
var city = document.getElementById('city');

var stateListForNtf = document.getElementById('stateListForNtf');
var stateIndex = 8;

var stateSelectedLabel = $("#uniform-stateListForNtf option");

console.log(stateSelectedLabel);

var zipcode = document.getElementById('zipcode');
var countryListForNtf = document.getElementById('countryListForNtf');
var calendar = document.getElementById('calendar'); // DD/MM/YY
var recTime = document.getElementById('recTime'); // HH:MM (AM/PM)
var btnContainer = document.getElementById('step_2_pane');

var btn = document.createElement('button');
var t = document.createTextNode('Auto Fill from Job #:');
btn.appendChild(t);

var job = document.createElement('input');
job.id = "job";
job.value = "";

btnContainer.appendChild(btn);
btnContainer.appendChild(job);

btn.id = 'autofill';

document.getElementById('autofill').style = 'font-size: 16px;';

btn.onclick = function(e) {
	e.preventDefault();
	loadDetails();
}

function loadDetails() {
	var details = [];
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://datarobot.compnow.com.au/magi/interface/lib/getJobDetailsdr.php?jobNumber=' + job.value,
		onload: function(response) {
			details = receivedDetails(response);
		}
	});
}

function receivedDetails(response) {
	var details = [];
	details = JSON.parse(response.responseText)[0];

	firstname.value = details.first;
	lastname.value = details.last;
	company.value = details.company;
	phone.value = details.phone;
	email.value = details.email;
	erje
	address1.value = details.address1;
	address2.value = details.address2;
	city.value = details.suburb;

	stateListForNtf.value = details.state;
	//stateIndex = stateListForNtf.selectedIndex;
	//stateSelectedLabel[stateIndex].innerHTML = details.state;

	zipcode.value = details.postcode;
	// calendar.value = details.requestdate;
	// recTime.value = "";

	return details;
}
