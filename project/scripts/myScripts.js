
let countRollingTime     = 0;
let thisRoundScore_white = 0;
let totalScore_white     = 0;
let thisRoundScore_black = 0;
let totalScore_black     = 0;
let dice_1               = 0;
let dice_2               = 0;
let dice_3               = 0;
let dice_4               = 0;
let animationActive      = false;
let intervalHandler;
const white              = document.getElementById("countWhite");
const black              = document.getElementById("countBlack");
const player             = document.getElementById("p1");
const component          = document.getElementById("p2");
const diceImage_1        = document.getElementById("playerDice1")
const diceImage_2        = document.getElementById("playerDice2")
const diceImage_3        = document.getElementById("componentDice1")
const diceImage_4        = document.getElementById("componentDice2")
const rollingBtn         = document.getElementById("start");
const resetBtn           = document.getElementById("reset");
const animate            = document.getElementById("animate");
const popup              = document.getElementById("popup");

outPutWhite();
outPutBlack();

function dice_Rolling() {
    dice_1          = Math.floor(Math.random() * 6) + 1;
    diceImage_1.src = `pic/dice/white_dice_${dice_1}.png`;
    dice_2          = Math.floor(Math.random() * 6) + 1;
    diceImage_2.src = `pic/dice/white_dice_${dice_2}.png`;
    dice_3          = Math.floor(Math.random() * 6) + 1;
    diceImage_3.src = `pic/dice/black_dice_${dice_3}.png`;
    dice_4          = Math.floor(Math.random() * 6) + 1;
    diceImage_4.src = `pic/dice/black_dice_${dice_4}.png`;
    calculateScore_white(dice_1, dice_2);
    calculateScore_black(dice_3, dice_4);
}

function calculateScore_white(num1, num2) {
    if (num1 == 1 || num2 == 1) {
        thisRoundScore_white = 0;
        totalScore_white    += thisRoundScore_white;
    } else if (num1 == num2) {
        thisRoundScore_white = (num1 + num2) * 2;
        totalScore_white    += thisRoundScore_white;
    } else {
        thisRoundScore_white = num1 + num2
        totalScore_white    += thisRoundScore_white
    }
    outPutWhite();
}
function calculateScore_black(num3, num4) {
    if (num3 == 1 || num4 == 1) {
        thisRoundScore_black = 0;
        totalScore_black    += thisRoundScore_black;
    } else if (num3 == num4) {
        thisRoundScore_black = (num3 + num4) * 2;
        totalScore_black    += thisRoundScore_black;
    } else {
        thisRoundScore_black = num3 + num4
        totalScore_black    += thisRoundScore_black
    }
    outPutBlack();
}

function showResult() {
    if (totalScore_white > totalScore_black) {
        p1.src = `pic/character/win.png`;
        p2.src = `pic/character/lose.jpg`;
        popup.innerHTML     = `<p>You Win!</p>`;
        popup.style.opacity = "1";
    } else if (totalScore_white < totalScore_black) {
        p1.src              = `pic/character/lose.jpg`;
        p2.src              = `pic/character/win.png`;
        popup.innerHTML     = `<p>You Lose!</p>`;
        popup.style.opacity = "1";
    } else {
        p1.src = `pic/character/playing.jpg`;
        p2.src = `pic/character/playing.jpg`;
        popup.innerHTML     = `<p>EVEN!!!</p>`;
        popup.style.opacity = "1";
    }
}

function resetGame() {
    countRollingTime     = 0;
    thisRoundScore_white = 0;
    totalScore_white     = 0;
    thisRoundScore_black = 0;
    totalScore_black     = 0;
    outPutWhite();
    outPutBlack();
    p1.src               = `pic/character/before.jpg`;
    p2.src               = `pic/character/before.jpg`;
    diceImage_1.src      = `pic/dice/white_dice_1.png`;
    diceImage_2.src      = `pic/dice/white_dice_6.png`;
    diceImage_3.src      = `pic/dice/black_dice_1.png`;
    diceImage_4.src      = `pic/dice/black_dice_6.png`;
    rollingBtn.disabled  = false;
    clearInterval(intervalHandler);
    animate.classList.remove("fade");
    popup.style.opacity  = "0";
    animationActive      = false;
}

function in_Game() {
    let index           = 1;
    animate.classList.add("fade");
    intervalHandler     = setInterval(function () {
        if (index < 4 && index >= 1) {
            index++;
            animate.src = `pic/dice/dice_rolling_${index}.png`;
        } else if (index = 4) {
            index = 1;
            index++;
            animate.src = `pic/dice/dice_rolling_${index}.png`;

        }
    }, 100);
}

rollingBtn.addEventListener("click", function () {
    if (countRollingTime < 3) {
        dice_Rolling();
        countRollingTime++;
        if (!animationActive) {
            animationActive = true;
            in_Game();
        }
    } else {
        rollingBtn.disabled = true;
        showResult();
    }
})

resetBtn.addEventListener("click", function () {
    resetGame();
})
function outPutWhite() {
    let whiteSideOutPut = ``;
    whiteSideOutPut    += `<h3>This Round Score:</h3>`;
    whiteSideOutPut    += `<h3>${thisRoundScore_white}</h3>`;
    whiteSideOutPut    += `<h3>Total Score:</h3>`;
    whiteSideOutPut    += `<h3>${totalScore_white}<h3>`;
    white.innerHTML     = whiteSideOutPut;
}

function outPutBlack() {
    let blackSideOutPut = ``;
    blackSideOutPut    += `<h3>This Round Score:</h3>`;
    blackSideOutPut    += `<h3>${thisRoundScore_black}</h3>`;
    blackSideOutPut    += `<h3>Total Score:</h3>`;
    blackSideOutPut    += `<h3>${totalScore_black}</h3>`;
    black.innerHTML     = blackSideOutPut;
}