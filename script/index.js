var buttonColours = ["red","blue","green","yellow"]
var gamePattern = []
var userClickedPattern = []
var levelStart = 0
var started = false

$(document).ready(function () {
    $(".btn").click(function () { 
       var userChosenColour = $(this).attr("id")
       userClickedPattern.push(userChosenColour)
       
        playSound(userChosenColour)
        animatingPress(userChosenColour)
        checkAnswer(userClickedPattern.length-1)


        
    });
});

$("#button-start").click(function () { 
    nextSequence()
    started = true
    
});

$(document).keypress(function(event){
    if(event.key){
        nextSequence()
        started = true
    }
})





//nextSequence()

function nextSequence(){
   setTimeout(function() {
    $("#button-start").fadeIn(300).fadeOut(400).fadeIn(300).css("visibility","hidden")
   }, 100);
    userClickedPattern = []

    var randomNumber = Math.round(Math.random()*3)
    var randomChosenNumber = buttonColours[randomNumber]
    console.log(randomChosenNumber)
    gamePattern.push(randomChosenNumber)

    $("#level-title").text("Level "+levelStart)

    //using the jquery to select the itens 
    $("#"+randomChosenNumber).fadeIn(300).fadeOut(400).fadeIn(300)
  
    //playSounds
    playSound(randomChosenNumber)

    levelStart++
    
}

function playSound (name) { 
    var audio = new Audio("sounds/"+name+".mp3")
    audio.volume = 0.1
    audio.play()
 }

 function animatingPress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function()  {
        $("#"+currentColour).removeClass("pressed")
    }, 200);
      
 }

 function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        if(gamePattern.length === userClickedPattern.length){
           setTimeout(() => {
              nextSequence() 
           }, 1000);
        }
    }else {
        playSound("sounds/wrong.mp3")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        restartGame()
        

    }

    console.log(gamePattern);
    console.log(userClickedPattern);
 }

 function restartGame(){
    levelStart = 0
    $("h1").text("Game Over, Press Any Key to Restart")
    $("#button-start").fadeIn(700).css("visibility","visible")
    $("#button-start").css("fontSize","10px")
    $("#button-start").text("Press to Restart")
    gamePattern = []
    userClickedPattern = []
    
 }