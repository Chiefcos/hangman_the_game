// global variables
var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
// the words for the hangman game
var answerWords = [
  "windmill",
  "clogs",
  "stroopwafels",
  "gouda",
  "amsterdam",
  "vangogh",
  "rembrandt",
  "vermeer",
  "mondriaan"
];

// these are the initial scores
var wins = 0;
var losses = 0;
var guessesRemaining = 10;

// these are containers to store data in
var incorrectLetters = [];
var currentWord = [];
var correctLetters = [];

// This links our data to the html page
var winsOnDoc = document.getElementById("wins");
var lossesOnDoc = document.getElementById("losses");
var guessesRemainingOnDoc = document.getElementById("guesses-remaining");
var currentWordOnDoc = document.getElementById("current-word");
var incorrectLettersOnDoc = document.getElementById("incorrect-letters");
var alertMessage = document.getElementById("alert-message");

// This is the a function that resets the entire game
function reset() {
  guessesRemaining = 10;
  currentWord = [];
  incorrectLetters = [];
  correctLetters = [];

  answer = answerWords[Math.floor(Math.random() * answerWords.length)];

  for (let i = 0; i < answer.length; i++) {
    currentWord.push("_");
    currentWordOnDoc.textContent = currentWord.join(" ");
  }

  guessesRemainingOnDoc.textContent = guessesRemaining;
  incorrectLettersOnDoc.textContent = incorrectLetters;
}

// we print the beginning scores onto the html
winsOnDoc.textContent = wins;
lossesOnDoc.textContent = losses;
guessesRemainingOnDoc.textContent = guessesRemaining;

// we randomly pick one of the hangman words
var answer = answerWords[Math.floor(Math.random() * answerWords.length)];

// Creating the _ items you see on the webpage
for (let i = 0; i < answer.length; i++) {
  currentWord.push("_");
  currentWordOnDoc.textContent = currentWord.join(" ");
}

// a function to show us what happens whenever you press a key
document.onkeyup = function(event) {
  var letter = event.key.toLowerCase();

  //   reset for the alertmessage
  alertMessage.textContent = "";

  //   check if the input is a letter or not
  if (alphabet.indexOf(letter) === -1) {
    alertMessage.textContent = "please select a letter";
  } else {
    //   start the game function
    evaluateUserInput(letter);
  }
};

// the game function which checks if the letter you pressed is in the word
function evaluateUserInput(letter) {
  if (answer.indexOf(letter) !== -1) {
    if (correctLetters.indexOf(letter) !== -1) {
      alertMessage.textContent = "You already did that";
    } else {
      correctLetters.push(letter);
      correctGuess(letter);
      //   lossIncrement(letter);
    }
  } else {
    duplicateCheck(letter);
  }
}

// this changes the _ to the correct letter whenever you guess the correct one
function correctGuess(letter) {
  for (let j = 0; j < answer.length; j++) {
    if (answer[j] === letter) {
      currentWord[j] = answer[j];
      winIncrement();
    }
  }
  currentWordOnDoc.textContent = currentWord.join(" ");
}

// We check if the letter is a duplicate on the incorrect letters
function duplicateCheck(letter) {
  if (incorrectLetters.indexOf(letter) !== -1) {
    alertMessage.textContent = "choose a different letter";
  } else {
    lossIncrement();
    incorrectLetters.push(letter);
    incorrectLettersOnDoc.textContent = incorrectLetters.join(", ");
  }
}

// When we get a wrong answer our guesses remaining go down, when we hit 0 guesses the losses go up by 1 and the game restarts
function lossIncrement(letter) {
  guessesRemaining--;
  guessesRemainingOnDoc.textContent = guessesRemaining;

  if (guessesRemaining === 0) {
    reset();
    losses++;
    lossesOnDoc.textContent = losses;
  }
}
// When we get a correct answer our wins go up by 1 and the game restarts
function winIncrement() {
  if (currentWord.indexOf("_") === -1) {
    wins++;
    winsOnDoc.textContent = wins;
    reset();
  }
}
