'use strict';

// main
const currentPlayerDisplayIndex = document.querySelector('#current-player');
const currentRoundDisplayIndex = document.querySelector('#current-round');
const poolDisplayIndex = document.querySelector('#current-pool');
const containerIndex = document.querySelector('.container');

// index arrays
let boxIndex = [];
let totalMoneyIndex = [];
let moneyOnTableIndex = [];
let foldButtonIndex = [];
let callButtonIndex = [];
let raiseInputIndex = [];
let raiseButtonIndex = [];
let allInButtonIndex = [];

// setting amount of money on the start
// const startMoney = prompt('How much money do you want?')
// console.log(startMoney);

const smallBlind = 5;
const bigBlind = 10;
const numOfPlayers = 4;
const playersName = ['Maciek', 'Ania', 'Zosia', 'Gocha'];
let moneyOnTable = [];
let totalMoney = [];
const moneyOnStart = 500;
let pool;
let currentRound = ['Big and small blind', 'Preflop', 'Flop', 'turn'];
let currentPlayer = 0;

// creating boxes and DOM
const creatingBoxes = function (x) {
  let html = ``;
  for (let i = 0; i <= x; i++) {
    // playersName.push(`Player ${i}`);
    // playersName[i] = prompt(`Name of ${i + 1} player`);
    html += `<div class="box" id="player-${i}">
    <!--PLAYER ${i} -->
    <p>${playersName[i]}</p>
    <p class="money-display" id="money-display-${i}">7834</p>
    <p class="money-on-table" id="money-on-table-${i}">1000</p>
    <button class="fold" id="fold-${i}">fold</button>
    <button class="call" id="call-${i}">call/check/blind</button>
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
    totalMoney.push(moneyOnStart);
    moneyOnTable.push(0);
    boxIndex.push(document.getElementById(`player-${i}`));
    totalMoneyIndex.push(document.getElementById(`money-display-${i}`));
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
  pool = 0;
  totalMoneyIndex.forEach(i => (i.innerHTML = moneyOnStart));
  moneyOnTableIndex.forEach(i => (i.innerHTML = 0));
  poolDisplayFunction(pool);
  currentPlayerDisplayFunction(currentPlayer);
  currentRoundDisplayFunction(currentRound[0]);
  currentPlayerDisplayFunction(playersName[currentPlayer]);
};

// displaying functions
const poolDisplayFunction = x => (poolDisplayIndex.innerHTML = `Pool: ${x}`);
const currentPlayerDisplayFunction = x =>
  (currentPlayerDisplayIndex.innerHTML = `Current player: ${x}`);
const currentRoundDisplayFunction = x =>
  (currentRoundDisplayIndex.innerHTML = `Round: ${x}`);
const greenBox = x => (boxIndex[x].style.backgroundColor = 'lightgreen');
const whiteBox = x => (boxIndex[x].style.backgroundColor = 'white');

// ROUND 1 - SMALL BLIND
// const smallBlindFunction = function () {
//   greenBox(currentPlayer);
//   console.log(currentPlayer);
//   callButtonIndex[currentPlayer].addEventListener('click', smallBlindListener);
// };

// const smallBlindListener = function () {
//   totalMoney[currentPlayer] -= smallBlind;
//   totalMoneyIndex[currentPlayer].innerHTML = totalMoney[currentPlayer];
//   moneyOnTableIndex[currentPlayer].innerHTML = smallBlind;
//   whiteBox(currentPlayer);
//   currentPlayer++;
//   greenBox(currentPlayer);
//   callButtonIndex[currentPlayer - 1].removeEventListener(
//     'click',
//     smallBlindListener
//   );
//   while (currentPlayer > 4) bigBlindFunction();
//   console.log(currentPlayer);
// };

// // ROUND 1 - BIG BLIND
// const bigBlindFunction = function () {
//   console.log(currentPlayer);
//   callButtonIndex[currentPlayer].addEventListener('click', bigBlindListener);
// };

// const bigBlindListener = function () {
//   totalMoney[currentPlayer] -= bigBlind;
//   totalMoneyIndex[currentPlayer].innerHTML = totalMoney[currentPlayer];
//   moneyOnTableIndex[currentPlayer].innerHTML = bigBlind;
//   whiteBox(currentPlayer);
//   currentPlayer++;
//   greenBox(currentPlayer);
//   callButtonIndex[currentPlayer - 1].removeEventListener(
//     'click',
//     bigBlindListener
//   );
// };
/////////////////////////////////////

// const smallBlindFunction = async () => {
//   await new Promise(resolve => {
//     callButtonIndex[currentPlayer].addEventListener('click', resolve);
//   });
//   console.log(currentPlayer);
//   currentPlayer++;
//   callButtonIndex[currentPlayer].addEventListener('click', () => {
//     // Kod dla drugiego przycisku.
//     console.log('tata');
//   });
// };

/////////////////////////////////////

creatingBoxes(numOfPlayers - 1);
gameStart();
smallBlindFunction();
// smallBlindFunction();
// boxIndex[2].style.color = 'blue';playersName
