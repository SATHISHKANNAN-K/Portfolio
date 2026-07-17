const buttons = document.querySelectorAll(".btn");

const startBtn = document.getElementById("startBtn");

const levelText = document.getElementById("level");

const scoreText = document.getElementById("score");

const message = document.getElementById("message");

let gamePattern = [];
let userPattern = [];

let level = 0;
let score = 0;

let canClick = false;

startBtn.onclick = startGame;

buttons.forEach(btn=>{

    btn.addEventListener("click",clickColor);

});

function startGame(){

    gamePattern = [];
    userPattern = [];

    level = 0;
    score = 0;

    levelText.innerHTML = level;
    scoreText.innerHTML = score;

    startBtn.disabled = true;

    nextLevel();
}

function nextLevel(){

    userPattern = [];

    level++;

    levelText.innerHTML = level;

    message.innerHTML = "Watch Carefully";

    const random = Math.floor(Math.random()*4);

    gamePattern.push(random);

    showPattern();
}

function showPattern(){

    canClick = false;

    let i = 0;

    const interval = setInterval(()=>{

        flash(gamePattern[i]);

        i++;

        if(i>=gamePattern.length){

            clearInterval(interval);

            setTimeout(()=>{

                canClick = true;

                message.innerHTML = "Your Turn";

            },500);

        }

    },700);

}

function flash(index){

    buttons[index].classList.add("active");

    setTimeout(()=>{

        buttons[index].classList.remove("active");

    },350);

}

function clickColor(){

    if(!canClick)
        return;

    const color = Number(this.dataset.color);

    flash(color);

    userPattern.push(color);

    const current = userPattern.length-1;

    if(userPattern[current]!==gamePattern[current]){

        message.innerHTML = "❌ Game Over";

        startBtn.disabled = false;

        startBtn.innerHTML = "Play Again";

        canClick = false;

        return;
    }

    score += 10;

    scoreText.innerHTML = score;

    if(userPattern.length===gamePattern.length){

        canClick = false;

        message.innerHTML = "✅ Correct";

        setTimeout(()=>{

            nextLevel();

        },1000);

    }

}