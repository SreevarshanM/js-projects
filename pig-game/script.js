'use strict';
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//intializing
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let total = [0, 0];
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let randomNum = Math.trunc(Math.random() * 6) + 1;
    console.log(randomNum);
    dice.src = `dice-${randomNum}.png`;
    dice.classList.remove('hidden');
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      randomNum = 0;
      switchPlayer();
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    if (activePlayer) {
      total[1] += currentScore;
      score1.textContent = total[1];
      if (total[1] >= 100) {
        playing = false;
        player1.classList.add('player--winner');
        dice.classList.add('hidden');
      }
    } else {
      total[0] += currentScore;
      score0.textContent = total[0];
      if (total[0] >= 100) {
        playing = false;
        player0.classList.add('player--winner');
        dice.classList.add('hidden');
      }
    }

    switchPlayer();
  }
});
btnNew.addEventListener('click', function () {
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  total = [0, 0];
});
