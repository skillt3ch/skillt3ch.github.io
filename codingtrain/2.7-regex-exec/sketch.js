var txt;

function setup() {
    noCanvas();

    txt = select("#txt");
    var submit = select("#submit");

    submit.mousePressed(regexSearch);
}

function regexSearch() {
    var s = txt.value();
    var r = /(\d{4})-\d{4}/g // find all phone numbers in format XXXX-XXXX

    var result = r.exec(s);

    while (result !== null) {
        createP(result[0] + ", " + result[1]);
        result = r.exec(s);
    }
}
