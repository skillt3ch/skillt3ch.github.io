function diastic(seed, words) {

    var phrase = [];
    var currentWord = 0;

    for (var i = 0; i < seed.length; i++) {
        var c = seed.charAt(i);

        for (var j = currentWord; j < words.length; j++) {
            if (words[j].charAt(i) == c) {
                phrase.push(words[j]);
                currentWord = j + 1;
                // console.log(words[j]);
                break;
            }
        }
    }
    return phrase;
}

var srctxt;
var words;

function preload() {
    srctxt = loadStrings("rainbow.txt");
}

function setup() {
    noCanvas();
    srctxt = join(srctxt, ' ');
    words = splitTokens(srctxt, ' -,.!:;[]()?"')

    var seed = select("#seed");
    var submit = select("#submit");
    submit.mousePressed(function() {
        var phrase = diastic(seed.value(), words);
        // createP(seed.value());
        createP(join(phrase, ' '));
    });
}
