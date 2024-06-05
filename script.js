'use strict';

// main
const currentPlayerDisplay = document.querySelector('#current-player');
const currentRoundDisplay = document.querySelector('#current-round');
const poolDisplay = document.querySelector('#current-pool');

// player 0
const box0 = document.querySelector('#player-0');
const money0 = document.querySelector('#money-0');
const moneyOnTable0 = document.querySelector('#money-on-table-0');
const fold0 = document.querySelector('#fold-0');
const call0 = document.querySelector('#call-0');
const raise0 = document.querySelector('#raise-0');
const all0 = document.querySelector('#all-in-0');

// player 1
const box1 = document.querySelector('#player-1');
const money1 = document.querySelector('#money-display-1');
const moneyOnTable1 = document.querySelector('#money-on-table-1');
const fold1 = document.querySelector('#fold-1');
const call1 = document.querySelector('#call-1');
const raise1 = document.querySelector('#raise-1');
const all1 = document.querySelector('#all-in-1');

// player 2
const box2 = document.querySelector('#player-2');
const money2 = document.querySelector('#money-display-2');
const moneyOnTable2 = document.querySelector('#money-on-table-2');
const fold2 = document.querySelector('#fold-2');
const call2 = document.querySelector('#call-2');
const raise2 = document.querySelector('#raise-2');
const all2 = document.querySelector('#all-in-2');

// player 3
const box3 = document.querySelector('#player-3');
const money3 = document.querySelector('#money-display-3');
const moneyOnTable3 = document.querySelector('#money-on-table-3');
const fold3 = document.querySelector('#fold-3');
const call3 = document.querySelector('#call-3');
const raise3 = document.querySelector('#raise-3');
const all3 = document.querySelector('#all-in-3');

// all buttons and displays
const foldButtons = document.querySelectorAll('.fold');
const callButtons = document.querySelectorAll('.call');
const raiseButtons = document.querySelectorAll('.raise');
const allInButtons = document.querySelectorAll('.all-in');
const moneyDisplays = document.querySelectorAll('.money-display');
const moneyOnTable = document.querySelectorAll('.money-on-table');

// console.log(money0);

// setting amount of money on the start
// const startMoney = prompt('How much money do you want?')
// console.log(startMoney);

const players = 4;
const moneyOnStart = 23000;
let pool;
let currentRound;
let currentPlayer;

// function to start a game
const gameStart = function () {
  pool = 0;
  currentRound = 1;
  currentPlayer = 1;
  moneyDisplays.forEach(i => (i.innerHTML = moneyOnStart));
  poolDisplay.innerHTML = `Pool: ${pool}`;
  currentPlayerDisplay.innerHTML = `Player: ${currentPlayer}`;
  currentRoundDisplay.innerHTML = `Round: ${currentRound}`;
};

gameStart();
