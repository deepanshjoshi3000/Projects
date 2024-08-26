let gameSeq = [];
let userSeq = [];
let scores = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(event) {
    if((scores.length != 0) && (event.key == "r")) {
        let max = Number. MIN_VALUE;
        for(score of scores) {
            if(score > max) {
                max = score;
            }
        }
        h2.innerHTML = `Highest score : ${max}. <br>Press 'S' to reset`;
        reset();
    }
    else {
        if(started == false && event.key == "s") {
            console.log("Game Started!");
            started = true;
    
            levelUp();
        };
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
};

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function() {
        btn.classList.remove("user-flash");
    }, 250);
};

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose
    let randIdx = Math.floor( Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
};

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout( levelUp, 1000);
        }
    }
    else {
        h2.innerHTML = `Game over! <br> Your score was <b>${level}</b> <br> Press 'R' for top score or 'S' to restart`;
        scores.push(level);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}