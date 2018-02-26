var text;
var text2;

function setup() {
    noCanvas();
    
    text = select("#text");
    text2 = select("#text2");
    // text.changed(addText);
    var submit = select("#submit");
    var submit2 = select("#submit2");
    submit.mousePressed(getTemp);
    submit2.mousePressed(sortAlpha);
}

function getTemp() {
    var s = text.value();
    
    var start = s.indexOf(": ") + 2;
    var end = s.indexOf(" degree");
    
    createP(s.substring(start, end));
}

function sortAlpha() {
    var s = text2.value();
    
    var words = split(s, ' ');
    words = words.sort();
    
    s = join(words, ' ');
    
    createP(s);
}