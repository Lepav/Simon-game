var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function (){
    if (level===0){
    $("h1").text("Level 0");
    nextSequence();
}
    else if ($("h1").text() === "Game Over, Press Any Key To Restart") { //if game-over press key to restart the game
    $("h1").text("Level 0");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
    }  
})

    
function nextSequence () {
var randomNumber = Math.floor(Math.random()*4); //get random number

var randomChosenColour = buttonColours [randomNumber]; //get colour from array with random number
gamePattern.push(randomChosenColour);
console.log(randomChosenColour);
$("#" + randomChosenColour).fadeOut(100, "linear");
$("#" + randomChosenColour).fadeIn(100, "linear");

playSound(randomChosenColour);
level++;
$("h1").text("Level " + level);
}

$(".btn").click(function(event){ // click event. Gives ID and feeds it to userClickedPattern array.
    var userChosenColour = $(event.target).attr("id");
    console.log($(event.target).attr("id"));
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    if (userClickedPattern.length == gamePattern.length && userClickedPattern.every(function (element,index){
        return element === gamePattern[index]})) //checks if all elements of userClickedPattern match elements of gamePattern
        {
        setTimeout(nextSequence,1000);
        userClickedPattern=[];
    }
    else if (userClickedPattern.some(function (element,index){ //check if at least some elements don't match
        return element !== gamePattern[index]})){
        $("h1").text("Game Over, Press Any Key To Restart"); // if game-over -> change text, play sound, display red background
        var wrongSound = new Audio ("sounds/wrong.mp3");
        wrongSound.play();
            $("body").addClass("game-over");
            setTimeout(function () {$("body").removeClass("game-over")},200);
        
    }

   
    })



    function playSound(name){ // play sound for nextSequence and the click function
        var sound = new Audio ("sounds/"+ name + ".mp3");
        sound.play();

    }


    function animatePress(currentColour){ //animation when button is pressed
        $("#" + currentColour).addClass("pressed");
        setTimeout(function(){
            $("#" + currentColour).removeClass("pressed")},
             100)};
        

    
