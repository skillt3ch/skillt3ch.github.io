var txt;

function setup() {
    noCanvas();

    txt = select("#txt");
    var submit = select("#submit");

    submit.mousePressed(regexSearch);
}

function regexSearch() {
    var s = txt.value();
    // var r = /[,.!?\s]+/ // split by any punctuation or space (split by words)
    var r = /(\W)+/ // split by any non-word character (split by words)
    // var r = /[.!?]/; // split by sentence

    var words = s.split(r);
    console.log(words);

    for (var i = 0; i < words.length; i++) {
        createP(words[i]);
    }
}
