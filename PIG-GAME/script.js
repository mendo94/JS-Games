"use strict";

//Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0]; //array is zero based, so players scores are set to zero to start
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0; //sets the score back to zero if they get a 1
  activePlayer = activePlayer === 0 ? 1 : 0; //this means if the active player is equal to zero, then we want the new active player to be 1, else it should be zero
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

init();
//Rolled dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled 1, if true, switch to next player
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      //3. fINSIH the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //siwtch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
