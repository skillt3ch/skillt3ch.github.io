var txt;
var output;

function setup() {
    noCanvas();

    txt = select("#txt");
    output = select("#output");
    var submit = select("#submit");

    submit.mousePressed(regexSearch);
}

function regexSearch() {
    var s = txt.value();
    var r = /(\W+)/;

    var words = s.split(r);
    //console.log(words);

    for (var i = 0; i < words.length; i++) {
        var span = createSpan(words[i]);
        span.parent(output);
        if (!/\W+/.test(words[i])) {
            //span.style("background-color", "#F0F");
            span.mouseOver(highlight);
        }
    }
}

function replacer(match, grp1, grp2) {
    //console.log(arguments);
    return match;
}

function highlight() {
    var s = this.html();
    var star = "";

    for (var i = 0; i < s.length; i++) {
        star += "*"
    }

    //console.log(star);
    this.html(star);

    this.style("background-color", color(random(255), random(255), random(255)));
    this.style("font-size", 30/s.length + 12 + "px");
}
