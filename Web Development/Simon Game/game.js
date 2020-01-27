
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern=[];
let userClickedPattern=[];
let isStarted=false;
let level=0;

$("body").keypress(function(){
    if(!isStarted)
    {
        isStarted=true;
        level=0;
        $("h1").text("Level 0");
        nextSequence();
    }
});

$(".btn").click(function(event){
    if(isStarted)
    {
      let userChosenColor = this.id;
      userClickedPattern.push(userChosenColor);
      playSound(userChosenColor);
      animatePress(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
    }
});


function playSound(name){
    let audio=new Audio('./sounds/'+name+'.mp3');
    audio.play();
};


function animatePress(currentColour){

    $("#"+currentColour).toggleClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColour).toggleClass("pressed");
    }, 100)

};


function nextSequence(){
    let randomNumber=Math.floor((Math.random()*4));
    let randomChosenColour=buttonColours[randomNumber];
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    level++;
    userClickedPattern=[];
    console.log(level);
    $("h1").text("Level "+ level);
};

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            setTimeout(nextSequence,1000);
        };
    }
    else{

        playSound("wrong");
        $('body').toggleClass("game-over");
        setTimeout(function(){
            $('body').toggleClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    };
};

function startOver(){
    level=0;
    gamePattern=[];
    isStarted=false;
}










