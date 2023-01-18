let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
userClickedPattern = [];
let level = 0;
$("#level-title").text("Press A Key to Start")
$(document).on("keypress",function(){
    if(level <= 0){
        nextSequence();
        
    }
    
});

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level)

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    return randomChosenColour;
    
    
}

$(".btn").on("click", function (e) { 
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    console.log(gamePattern);
    console.log(userClickedPattern);

    
    
    
});

function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
};

function animatePress(currentColour){
    $("#"+currentColour).addClass('pressed');
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
    });

    
};

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length  === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
        
    }
    else{
        console.log("wrong");
        endGame();
    }
};

function endGame(){
    $("body").addClass('game-over');
    setTimeout(function(){
        $("body").removeClass('game-over');
    }, 200)

  
    let audio = new Audio('sounds/wrong.mp3');
    audio.play();

    $("#level-title").text("Game Over, Press Any Key to Restart");
    restart();
    
};

function restart(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;


}

