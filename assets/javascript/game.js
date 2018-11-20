// VARIABLES
var passwords =
    [
        "abcde",
        "fghij",
        "klmno",
        "pqrst",
    ];

var maxTries = 10;            
var guessedLetters = [];
var currentWordIndex;
var currentPass = [];
var remainingGuesses = 0;

var gameStarted = false;
var hasFinished = false;

var wins = 0;                   

//GAME LOGIC

function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (passwords.length));

    guessedLetters = [];
    currentPass = [];

    // want to add typewriter function to make instructions type across page

    for (var i = 0; i < passwords[currentWordIndex].length; i++) {
        currentPass.push("_");
    }


    // Hide game over and win images/text
    document.getElementById("pressKey").style.cssText= "display: none";
    document.getElementById("gameover").style.cssText = "display: none";
    document.getElementById("youwin").style.cssText = "display: none";
    document.getElementById("startGame").style.cssText = "display: block";

    updatePage();
};

function updatePage() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("yourPass").innerText = "";
    for (var i = 0; i < currentPass.length; i++) {
        document.getElementById("yourPass").innerText += currentPass[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;

    if(remainingGuesses <= 0) {
        document.getElementById("gameover").style.cssText = "display: block";
        document.getElementById("pressKey").style.cssText = "display:block";
        hasFinished = true;
    }
};


document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        document.getElementById("startGame").style.cssText = "display: none";
        makeGuess(event.key.toLowerCase());
    }
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updatePage();
    checkWin();
};

function evaluateGuess(letter) {

    var positions = [];

    for (var i = 0; i < passwords[currentWordIndex].length; i++) {
        if(passwords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            currentPass[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(currentPass.indexOf("_") === -1) {
        document.getElementById("youwin").style.cssText = "display: block";
        document.getElementById("pressKey").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};