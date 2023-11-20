var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// press key to update the level title on the page
$(document).keypress(function() {
  if (!started) {
    // update sequence
    nextSequence();
    // set start as True
    started = true; 
  }
});

// generate effect on pressing buttons
$(".btn").click(function() {

  // this points to the button pressed by user
  var userChosenColour = $(this).attr("id"); 
  // update used clicked pattern
  userClickedPattern.push(userChosenColour)

  playSound(userClickedPattern);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)

});

function nextSequence() {
  // clear userClickedPattern
  userClickedPattern = [];
  // update level
  level += 1; 

  // update text on id level-title
  $("#level-title").text("Level" + level);
  // Returns a random number from 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);
  // choose a random chosen color
  var randomChosenColour = buttonColours[randomNumber];
  // update game pattern
  gamePattern.push(randomChosenColour);

  // make effect on random chosen color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // play sound on random chosen color
  playSound(randomChosenColour); 

}

// check answers based on currentLevel
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function animatePress(currentColor) {
  // add effect on current color from css pressed id
  $("#" + currentColor).addClass("pressed");
  // remove effect on current color from css pressed id after 100 seconds
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Create a new function called startOver().
function startOver() {

  // reset the values of level
  level = 0;
  // reset gamePattern
  gamePattern = [];
  // reset started variables
  started = false;
}
