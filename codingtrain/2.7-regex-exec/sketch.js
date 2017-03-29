var txt;

function setup() {
    noCanvas();

    txt = select("#txt");
    var submit = select("#submit");

    submit.mousePressed(newText);
}

function newText() {
    var s = txt.value();
    createP(s);
}
