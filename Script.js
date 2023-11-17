const win = document.querySelector('.js-win');
const lose = document.querySelector('.js-lose');
const tie = document.querySelector('.js-tie');
const resultParagraph = document.querySelector('.js-result');
const moves = document.querySelector('.js-moves');
const reset = document.querySelector('.js-reset-btn');

const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};

function playComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber > 0 && randomNumber <= 1/3) {
    computerMove = 'Rock'
  }else if(randomNumber > 1/3 && randomNumber <= 2/3) {
    computerMove = 'Paper'
  }else if(randomNumber > 2/3 && randomNumber < 1) {
    computerMove = 'Scissors'
  }
  return computerMove
}
function playGame(playerMove) {
  const computerMove = playComputerMove();
  let result = '';
  
  if(playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'It is a Tie.'
    }else if(computerMove === 'Paper') {
      result = 'You lose, Computer won.'
    }else if(computerMove === 'Scissors') {
      result = 'You won, Computer lose.'
    }
  }
  else if(playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You won, Computer lose.'
    }else if(computerMove === 'Paper') {
      result = 'It is a Tie.'
    }else if(computerMove === 'Scissors') {
      result = 'You lose, Computer won.'
    }
  }
  else if(playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose, Computer won.'
    }else if(computerMove === 'Paper') {
      result = 'You won, Computer lose.'
    }else if(computerMove === 'Scissors') {
      result = 'It is a Tie.'
    }
  }

  if(result === 'You won, Computer lose.') {
    score.wins += 1
  }else if(result === 'You lose, Computer won.') {
    score.loses += 1
  }else if(result === 'It is a Tie.') {
    score.ties += 1
  }

  showScore();
  resultParagraph.innerHTML = result;
  moves.innerHTML = `<p>
  Your move -<img src="./images/${playerMove}.png" alt="">
</p>
<p>
  Computer move -<img src="./images/${computerMove}.png" alt="">
</p>`

  localStorage.setItem('score', JSON.stringify(score));
}
function showScore() {
  win.innerHTML = score.wins
  lose.innerHTML = score.loses
  tie.innerHTML = score.ties
};

reset.addEventListener('click', () => {
  score.wins = 0
  score.loses = 0
  score.ties = 0

  showScore();
  resultParagraph.innerHTML = '';
  moves.innerHTML = '';

  localStorage.removeItem('score'); 
});