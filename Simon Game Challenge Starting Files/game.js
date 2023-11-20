// Create an array called buttonColors 
var buttonColours = ["red", "blue", "green", "yellow"]; 

// Create an empty array called gamePattern
var gamePattern = []; 

// At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = []

// You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

// Create a new variable called level and start at level 0.
var level = 0;

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {

    // game has not started
    if (!started) {

        // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function(){

    // Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    // This refers to the specific button that was clicked.
    // $(this) is used to select the element that was clicked, 
    // and .attr("id") retrieves the "id" attribute of that clicked element. 
    // So, userChosenColour will be assigned the ID of the button that was clicked.
    var userChosenColour = $(this).attr("id");

    // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    
    // play sound on the chosen color
    playSound(userChosenColour);

    // make press animation based on the userChosenColour
    animatePress(userChosenColour); 

    // check answer
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){

        console.log("success");

        if (userClickedPattern.length == gamePattern.length){
            setTimeout(function() {
                nextSequence(); 
            }, 1000); 
          }
        } else {
            console.log("wrong"); 

            // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
            playSound("wrong"); 

            // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
            $("body").addClass("game-over"); 

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200); 

            // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
            $("#level-title").text("Game over. Press any key to restart");

            // Call startOver() if the user gets the sequence wrong.
            startOver();
    }
}

// Create the nextSequence function
function nextSequence() {

    userClickedPattern = [];

    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++; 

    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level); 

    // Generate a random number between 0 (inclusive) and 4 (exclusive)
    var randomNumber = Math.floor(Math.random() * 4); 
    // Select a random color from buttonColors using random number
    var randomChosenColor = buttonColours[randomNumber];
    // Add the randomChosenColour to the gamePattern
    gamePattern.push(randomChosenColor);

    // Use jQuery to select the button with the same id as the randomChosenColour
    // Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    playSound(randomChosenColor); 
}

function playSound(name){

    // Take the code we used to play sound in the nextSequence() function and add it to playSound().
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor){

    // Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");

    // Use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Create a new function called startOver().
function startOver() {

    // reset the values of level
    level = 0;
    // reset gamePattern
    gamePattern = [];
    // reset started variables
    started = false; 
}




