var textinput;

function update () {
    noCanvas();
    textinput = select("#textinput");
    var submit = select("#submit");
    submit.mousePressed(newText);
}

function newText () {
    var s = textinput.value();
    console.log(s);
}
