'use strict';
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// Update message text
const updateMessage = message => {
  document.querySelector('.message').textContent = message;
};

// Update score
const updateScore = () => {
  document.querySelector('.score').textContent = score;
};

// Handle win state
const handleWin = () => {
  updateMessage('🏆 Correct Number!!!');
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
};

// Handle incorrect guesses
const handleIncorrectGuess = (guess, message) => {
  if (score > 1) {
    updateMessage(message);
    score--;
    updateScore();
  } else {
    updateMessage('😔 You lost!');
    document.querySelector('.score').textContent = 0;
  }
};

// Reset game state
const resetGame = () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
  updateMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  updateScore();
};

// Event listener for "Check" button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    updateMessage('⛔ No Number');
  } else if (guess === secretNumber) {
    handleWin();
  } else {
    const isClose = Math.abs(guess - secretNumber) <= 2;
    const message =
      guess > secretNumber
        ? isClose
          ? '🔥 Slightly high!'
          : '📈 Too high!'
        : isClose
        ? '🔥 Slightly low!'
        : '📉 Too low!';
    handleIncorrectGuess(guess, message);
  }
});

// Event listener for "Again" button
document.querySelector('.again').addEventListener('click', resetGame);

resetGame();
