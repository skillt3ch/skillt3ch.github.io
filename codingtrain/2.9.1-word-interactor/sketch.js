var txt;

function setup() {
    noCanvas();

    txt = select("#txt");
    var submit = select("#submit");

    submit.mousePressed(regexSearch);
}

function regexSearch() {
    var s = txt.value();
    var r = /(\d{3})-(\d{4})/g;

    var newstring = s.replace(r, replacer);
    createP(newstring);
}

function replacer(match, grp1, grp2) {
    console.log(arguments);
    return match;
}
