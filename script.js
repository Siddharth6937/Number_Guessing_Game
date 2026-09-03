// Generate Random Number
let randomNumber = Math.floor(Math.random() * 100) + 1;

let previousGuesses = [];
let guessesRemaining = 10;
let score = 0;
let gameOver = false;

// Elements
const guessField = document.getElementById("guessField");
const submitBtn = document.getElementById("submit");
const newGameBtn = document.getElementById("newGame");

const message = document.getElementById("message");
const previousGuess = document.getElementById("previousGuess");
const remainingGuess = document.getElementById("remainingGuess");
const scoreBox = document.getElementById("score");
const attemptDots = document.querySelectorAll(".attempt-dots b");

// Submit Guess
submitBtn.addEventListener("click", checkGuess);

// Press Enter
guessField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkGuess();
  }
});

// Check Guess
function checkGuess() {
  if (gameOver) return;

  let guess = Number(guessField.value);

  // Validation
  if (guess === "" || isNaN(guess)) {
    showMessage("⚠ Please enter a number", "#ffb347");
    return;
  }

  if (guess < 1 || guess > 100) {
    showMessage("Enter a number between 1 and 100", "#ff6464");
    return;
  }

  previousGuesses.push(guess);
  guessesRemaining--;

  previousGuess.textContent = previousGuesses.join(", ");
  remainingGuess.textContent = guessesRemaining;
  updateAttemptDots();

  // Correct Guess
  if (guess === randomNumber) {
    score = getScoreForAttempt(previousGuesses.length);
    scoreBox.textContent = score;

    showMessage("🎉 Congratulations! You guessed it!", "#57ff8f");

    gameOver = true;

    submitBtn.disabled = true;
    guessField.disabled = true;

    return;
  }

  // Too Low
  if (guess < randomNumber) {
    showMessage("📉 Too Low!", "#62b4ff");
  }

  // Too High
  else {
    showMessage("📈 Too High!", "#ff6464");
  }

  // Game Over
  if (guessesRemaining === 0) {
    showMessage(`💀 Game Over! Number was ${randomNumber}`, "#ff5555");

    gameOver = true;

    submitBtn.disabled = true;
    guessField.disabled = true;
  }

  guessField.value = "";
  guessField.focus();
}

function getScoreForAttempt(attempt) {
  const scoreTable = {
    1: 100,
    2: 90,
    3: 80,
    4: 70,
    5: 60,
    6: 50,
    7: 40,
    8: 30,
    9: 20,
    10: 10,
  };
  return scoreTable[attempt] || 0;
}

function updateAttemptDots() {
  attemptDots.forEach((dot, index) => {
    dot.classList.toggle("dot-empty", index >= guessesRemaining);
  });
}

// Display Message
function showMessage(text, color) {
  message.innerHTML = text;
  message.style.color = color;
}

// Restart Game
newGameBtn.addEventListener("click", resetGame);

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;

  previousGuesses = [];

  guessesRemaining = 10;
  score = 0;

  gameOver = false;

  previousGuess.textContent = "-";

  remainingGuess.textContent = guessesRemaining;
  scoreBox.textContent = "-";

  message.innerHTML = "🎯 New Game Started!";

  updateAttemptDots();

  message.style.color = "#ffffff";

  guessField.value = "";

  guessField.disabled = false;

  submitBtn.disabled = false;

  guessField.focus();
}
