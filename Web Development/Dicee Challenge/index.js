var randomNumber1 = Math.floor(Math.random()*6)+1;
var newImg="./images/dice"+randomNumber1+".png";
document.querySelector(".img1").setAttribute("src",newImg);



var randomNumber2 = Math.floor(Math.random()*6)+1;
newImg="./images/dice"+randomNumber2+".png";
document.querySelector(".img2").setAttribute("src",newImg);


var header = document.querySelector("h1");

if(header)
{
    if(randomNumber1>randomNumber2)
    {
        header.innerHTML="Player One Wins !";
    }
    else if (randomNumber1<randomNumber2)
    {
        header.innerHTML="Player Two Wins !";
    }
    else {
        header.innerHTML="DRAW !";
    }
}