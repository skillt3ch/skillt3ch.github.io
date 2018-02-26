var txt;

function setup() {
    noCanvas();

    var submit = select("#submit");
    txt = select("#txt");
    //submit.mousePressed(newText);
    submit.mousePressed(newGroup);
}

function newText() {
    var s = txt.value();
    var r = /\d{3}[-.]\d{4}/g;

    var matches = s.match(r);
    var count = 0;
    for (var i = 0; i < matches.length; i++) {
        createP(matches[i]);
        count++;
    }
    createP(count + (count == 1 ? " match" : " matches") + " found!");
}

function newGroup() {
    var s = txt.value();
    var r = /(\d{3})-(\d{4})/;

    var match = s.match(r);

    createP("Full expression found: " + match[0]);
    createP("Groups found: " + match[1] + " | " +  match[2]);
    createP("Reordered: " + match[2] + "-" + match[1]);
}
