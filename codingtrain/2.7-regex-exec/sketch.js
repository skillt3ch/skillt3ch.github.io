var textinput;

function update() {
    noCanvas();

    textinput = select("#textinput");
    var submit = select("#submit");

    submit.mousePressed(newText);
}

function newText() {
    alert("test");
    var s = txt.value();
    console.log(s);
}
