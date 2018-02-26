
function binaryAgent(str) {
    // split string into array
    var arr = str.split(' ');
    // create variable for translated string
    var translation = '';
    // convert binary string to its own array, and reverse it.
    for (var i = 0; i < arr.length; i++) {
        // convert binary string to reversed array
        var binary = arr[i].split('').reverse();
        // now iterate through reversed binary and calculate decimal value of each binary value
        // add each decimal value to the total
        var decimal = 0;

        for (var b = 0; b < binary.length; b++) {
            decimal += Math.pow(2, b) * binary[b];
        }
        // convert decimal to its corresponding ascii character and append it to the sentence
        translation += String.fromCharCode(decimal);
    }
    return translation;
}


$(document).ready(function () {
    //$("p").html("Document loaded successfully");
    $("#submit").click(function() {
        $("#decoded").html(binaryAgent($("#cipher").val()));
    });
});