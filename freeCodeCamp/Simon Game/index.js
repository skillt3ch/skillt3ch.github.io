/* eslint-env browser */

$(document).ready(function() {


    //    Create game status object
    var gameStatus = {};
    
    gameStatus.steps = [];

    function gameStart() {
//        gameStatus.init();
        gameStatus.addStep();
    }

    gameStatus.init = function() {
        console.log("Initialise game state");
        this.steps = [];
    }
    
    gameStatus.addStep = function() {
        var r = Math.floor(Math.random() * 4);
        this.steps.push(r);
        console.log(this.steps);
    }


    function toggleStrict() {
        $("#mode-led").toggleClass("led-on");
    }





    //    Add step
    function addStep() {

    }


    //	When clicking the power button
    $(".sw-slot").click(function() {
        // toggle switch
        $("#pwr-sw").toggleClass("sw-on");
        //		If the power button is off
        if($("#pwr-sw").hasClass("sw-on")==false) {
            //			Initialise values and turn off LED display
            $(".count").text("--");
            $(".count").addClass("led-off");
            $("#mode-led").removeClass("led-on");
            $("#mode").off("click");
            $("#start").off("click");
        } else {
            //			Power button is on
            $("#mode").click(toggleStrict);
            $("#start").click(gameStart);
            $(".count").removeClass("led-off");
        }
    });


});