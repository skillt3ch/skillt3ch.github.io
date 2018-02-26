var text;
var info;

function loadFile() {
    loadStrings("rainbow.txt", fileLoaded);
}

function fileLoaded(data) {
    text.html(data.join('<br/>'));
}

function fileSelected(file) {
    info.html(file.name + " " + file.size + " " + file.type);

    if (file.type == "text") {
        text.html(file.data);
    } else {
        info.html("I need a text file");
    }
}

function setup() {
    background(0);
    noCanvas();
    text = select("#text");
    info = select("#info");
    var button = select("#loadfile");
    
    createFileInput(fileSelected);

    

    button.mousePressed(loadFile);
}