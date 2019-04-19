var squares = document.querySelectorAll(".square");
var topBar = document.querySelector(".top-bar");
var rgbSpan = document.querySelector(".rgb");
var resultInfo = document.querySelector(".tip");
var modeLevel = document.querySelectorAll(".mode");
var newColors = document.querySelector(".new-colors");
var easy = 3;
var mid = 6;
var hard = 9;
var firstTime = hard;
var level = mid;
var squareArr = [];



init();

function init() {
    setColor(hard, "hide");
    randomPaintSquares(level);

    for (var i = 0; i < 9; i++) {
        squares[i].addEventListener("click", checkPickColor);
    }

    for (var i = 0; i < modeLevel.length; i++) {
        modeLevel[i].addEventListener("click", checkSelMode);
    }
}

function setMode(newLevel) {
    level = newLevel;
    setColor(level, "block");
    hideSquare();
}

newColors.addEventListener("click", function () {
    randomPaintSquares(level);
    this.textContent = "New Colors";
    newColors.classList.remove("activeLevel");
})


function hideSquare() {
    for (var i = 0; i < squareArr.length; i++) {
        if (squareArr[i].view === "hide") {
            squares[i].classList.add("hide");
        }
        else {
            squares[i].classList.remove("hide");
        }
    }
}


function randomColor() {
    return Math.round(255 * Math.random());
}

function colorChoice(removeColor, setColor, tip) {
    resultInfo.classList.remove(removeColor);
    resultInfo.classList.add(setColor);
    resultInfo.textContent = tip;
}

function randomPaintSquares(steps) {
    setColor(steps, "block");
    for (var i = 0; i < steps; i++) {
        squares[i].style.background = squareArr[i].color;
        rgbSpan.textContent = squares[Math.round(Math.random() * (level - 1))].style.background;
    }
    resultInfo.textContent = "";
    topBar.style.background = "rgb(46, 105, 233)";
}

function setColor(level, view) {
    for (var i = 0; i < level; i++) {
        if (firstTime > 0) {
            var square = new Object();
            squareArr.push(square);
            firstTime--;
        }
        squareArr[i] = setSquareProperty(squareArr[i], getRandColor(), view)
    }
    setHide(level);
}

function setSquareProperty(square, color, view) {
    square.color = color;
    square.view = view;
    return square;
}

function setHide(level) {
    for (var i = level; i < squareArr.length; i++) {
        squareArr[i].view = "hide";
    }
}

function getRandColor() {
    var green = randomColor();
    var red = randomColor();
    var blue = randomColor();
    return color = "rgb(" + red + ", " + blue + ", " + green + ")";
}

function checkPickColor() {
    if (this.style.background === rgbSpan.textContent) {
        for (var i = 0; i < level; i++) {
            squares[i].style.background = rgbSpan.textContent;
        }
        topBar.style.background = rgbSpan.textContent;
        colorChoice("wrong", "correct", "Correct!!!");
        newColors.textContent = "Try Again?";
        newColors.classList.add("activeLevel");
    } else {
        colorChoice("correct", "wrong", "Wrong, Picked: " + this.style.background + " Try Again!!!");
        this.removeEventListener("click", checkSelMode);
        this.style.background = "rgb(41, 41, 37)";
    }
}

function checkSelMode() {
    for (var i = 0; i < modeLevel.length; i++) {
        modeLevel[i].classList.remove("activeLevel");
    }
    this.classList.add("activeLevel");
    if (this.textContent === "EASY" && level !== easy) {
        setMode(easy);
    } else if (this.textContent === "MID" && level !== mid) {
        setMode(mid)
    } else if (this.textContent === "HARD" && level !== hard) {
        setMode(hard)
    }
    randomPaintSquares(level);
}
