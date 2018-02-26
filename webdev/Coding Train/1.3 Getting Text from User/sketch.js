var textfield;
var submit;

function setup() {
    noCanvas();
    //textfield = createInput();
    textfield = select('#textfield');
    output = select('#output');
    submit = select('#submit');
    output.html(textfield.value());
    
    submit.mousePressed(newText);    
    textfield.input(updateText);
};

function updateText() {
    output.html(textfield.value());
}

function newText() {
    createP(textfield.value());
    //console.log(textfield.value());
}