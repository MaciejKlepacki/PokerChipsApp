'use strict';

// main
const currentPlayerDisplayIndex = document.querySelector('#current-player');
const currentRoundDisplayIndex = document.querySelector('#current-round');
const poolDisplayIndex = document.querySelector('#current-pool');
const containerIndex = document.querySelector('.container');

// index arrays
let boxIndex = [];
let moneyDisplayIndex = [];
let moneyOnTableIndex = [];
let foldButtonIndex = [];
let callButtonIndex = [];
let raiseInputIndex = [];
let raiseButtonIndex = [];
let allInButtonIndex = [];

// setting amount of money on the start
// const startMoney = prompt('How much money do you want?')
// console.log(startMoney);

const players = 4;
const moneyOnStart = 21000;
let pool;
let currentRound;
let currentPlayer;

// creating boxes and DOM
const creatingBoxes = function (x) {
  let html = ``;
  for (let i = 0; i <= x; i++) {
    html += `<div class="box" id="player-${i}">
    <!--PLAYER ${i} -->
    <p>Player ${i}</p>
    <p class="money-display" id="money-display-${i}">7834</p>
    <p class="money-on-table" id="money-on-table-${i}">1000</p>
    <button class="fold" id="fold-${i}">fold</button>
    <button class="call" id="call-${i}">call/check</button>
    <input
      class="raise-input"
      id="raise-input-${i}"
      type="number"
      placeholder="Raise"
    />
    <button class="raise" id="raise-${i}">raise</button>
    <button class="all-in" id="all-in-${i}">all in</button>
  </div>`;
  }
  containerIndex.innerHTML = html;
  for (let i = 0; i <= x; i++) {
    boxIndex.push(document.getElementById(`player-${i}`));
    moneyDisplayIndex.push(document.getElementById(`money-display-${i}`));
    moneyOnTableIndex.push(document.getElementById(`money-on-table-${i}`));
    foldButtonIndex.push(document.getElementById(`fold-${i}`));
    callButtonIndex.push(document.getElementById(`call-${i}`));
    raiseInputIndex.push(document.getElementById(`raise-input-${i}`));
    raiseButtonIndex.push(document.getElementById(`raise-${i}`));
    allInButtonIndex.push(document.getElementById(`all-in-${i}`));
  }
};

// function to start a game
const gameStart = function () {
  currentPlayer = 1;
  currentRound = 1;
  pool = 0;
  moneyDisplayIndex.forEach(i => (i.innerHTML = moneyOnStart));
  moneyOnTableIndex.forEach(i => (i.innerHTML = 0));
  poolDisplayFunction(pool);
  currentPlayerDisplayFunction(currentPlayer);
  currentRoundDisplayFunction(currentRound);
};

// displaying functions
const poolDisplayFunction = x => (poolDisplayIndex.innerHTML = `Pool: ${x}`);
const currentPlayerDisplayFunction = x =>
  (currentPlayerDisplayIndex.innerHTML = `Player: ${x}`);
const currentRoundDisplayFunction = x =>
  (currentRoundDisplayIndex.innerHTML = `Round: ${x}`);

/////////////////////////////////////

/////////////////////////////////////

creatingBoxes(players - 1);
gameStart();
// boxIndex[2].style.color = 'blue';
