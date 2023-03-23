const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(".btn").click(function() {
    if (started === true) {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}
})

if (started === false) {
$(document).on("keypress", function() {
    started = true;
    console.log("Let the games begin!!!");
    nextSequence();
    $("h1").text(`Level ${level}`);
});
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text(`Level ${level}`);
}

function playSound(name) {
    let sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function animatePress(currentColour) {
     $(`#${currentColour}`).addClass("pressed");
     setTimeout(function() {
        $(`#${currentColour}`).removeClass("pressed");
     }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}