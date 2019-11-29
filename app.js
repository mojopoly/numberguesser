// Game values
let min = 1,
  max = 10,
  winningNum = Math.floor(Math.random() * (max - min + 1) + min),
  guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Add event listener
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  //console.log(guess);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  if (guess === winningNum) {
    gameOver(true, `Bum! You got it!!!`);
  } else {
    guessesLeft--;
    if (guessesLeft > 0) {
      setMessage(
        `${guess} is not correct; ${guessesLeft} guesses left!`,
        'red'
      );
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
    } else {
      gameOver(false, `Game Over, you lost! Correct number was ${winningNum}`);
    }
  }
});

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function gameOver(won, msg) {
  let color;
  won ? (color = 'green') : (color = 'red');
  message.style.color = color;
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg);

  guessBtn.value = 'Play Again?';
  guessBtn.className += 'play-again';
}

game.addEventListener('mousedown', function(e) {
  // console.log();
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
    guessBtn.value = 'Submit';
    guessBtn.className = '';
  }
});

document.addEventListener('mousemove', function(e) {
  document.body.style.backgroundColor = `rgba(${e.offsetX}, ${e.offsetY}, 0,  0.7)`;
});
