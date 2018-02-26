function convertToRoman(num) {
    num = parseInt(num);
    
    if (num < 0 || num > 9999) {
        return "Fek off, Baz";
    }
    
    var romanNumeral = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    var decimalValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

    var roman = '';

    for (var i = 0; i < decimalValue.length; i++) {
        while (decimalValue[i] <= num) {
            roman += romanNumeral[i];
            num -= decimalValue[i];
        }
    }

    return roman;
}


$(document).ready(function () {
    // $("p").html("Document loaded successfully");
    $("#convert").click(function () {
        $("#arabic").val((convertToRoman($("#arabic").val())));
    });
});