var input;
var button;
var lexicon;

function setup() {
    noCanvas();
    input = createInput('Dogs love to play');
    button = createButton('Submit');
    button.mousePressed(processRita);
    // input.changed(processRita);
    input.size(250);
    lexicon = new RiLexicon();
}

function processRita() {
    var s = input.value();
    var rs = new RiString(s);
    var words = rs.words();
    var pos = rs.pos();

    console.log(words);
    console.log(pos);

    var output = '';
    for (i = 0; i < words.length; i++) {
        if (/vb.*/.test(pos[i])) {
            console.log(pos[i]);
            output += lexicon.randomWord(pos[i]);
        } else {
            output += words[i];
        }
        output += ' ';
    }
    createP(output);
}
