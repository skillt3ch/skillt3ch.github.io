$(document).ready(function() {
    // initialise values for entry and equation
    var entry = "";
    var equation = [];
    var clearFlag = false;

    // handle any button clicks
    $("button").click(function() {
        var btnPressed = $(this).val();
        var lcd = $("#lcd").html();


        // determine what action to take based on which button was pressed
        switch (btnPressed) {
            case "ac":
                equation = [];
                clearEntry();
                break;
            case "ce":
                clearEntry();
                break;
            case "/":
                addOp("/");
                break;
            case "x":
                addOp("x");
                break;
            case "-":
                addOp("-");
                break;
            case "+":
                addOp("+");
                break;
            case "=":
                console.log("=");
                $("#lcd").html(calculate());
                break;
            case ".":
                if (entry == "") {
                    entry += "0";
                }
                if (entry.indexOf(".") != -1) {
                    break;
                }
                entry += "."
                $("#lcd").html(entry);
                console.log(".");
                break;
            default:
                if (entry.length >= 12) {
                    console.log("Max digits reached");
                } else {
                    if (clearFlag) {
                        clearEntry();
                        clearFlag = false;
                    }
                    entry += btnPressed;
                    console.log("default");
                    if ($("#lcd").html() == "0") {
                        console.log("0");
                        $("#lcd").html($(this).val());
                    } else {
                        console.log($(this).val());
                        $("#lcd").append($(this).val());
                    }
                    break;
                }
        }

        function clearEntry() {
            entry = "";
            $("#lcd").html(entry);
			$("#eq").html(equation.join(""));
            console.log(equation, entry);
        }

        function addOp(op) {
            if (entry != "") {
                if (op == "=") {
                    equation.push(entry);
					$("#eq").html(equation.join(""));
                    clearEntry();
                } else {
                    equation.push(entry, op);
					$("#eq").html(equation.join(""));
                    clearFlag = true;
                    //clearEntry();
                    console.log(op);
                }
            }
        }

        function calculate() {
            addOp("=");
            var ans = 0;

            while (equation.length > 2) {
                console.log("calculated", equation);
                var num1 = parseFloat(equation[0]);
                var op = equation[1];
                var num2 = parseFloat(equation[2]);

                switch (op) {
                    case "+":
                        ans = num1 + num2;
                        break;

                    case "-":
                        ans = num1 - num2;
                        break;

                    case "x":
                        ans = num1 * num2;
                        break;

                    case "/":
                        if (num2 == 0) {
                            return "divide by 0!";
                        } else {
                            ans = num1 / num2
                            break;
                        }
                }
                equation = [ans].concat(equation.slice(3));
            }

            ans = Number(Math.round(equation[0] + 'e8') + 'e-8');

            if (isNaN(ans)) {
                return "NaN";
            } else {
                equation = [];
                entry = ans;

                return ans;
            }
        }
    });
})
