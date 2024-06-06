'use strict';

// main
const poolDisplayIndex = document.querySelector('#current-pool');
const containerIndex = document.querySelector('.container');
const whoWinContainerIndex = document.querySelector('#whoWin');
const blindAllIndex = document.querySelector('#blind-all');

// index arrays
let boxIndex = [];
let totalMoneyIndex = [];
let moneyOnTableIndex = [];
let foldButtonIndex = [];
let callButtonIndex = [];
let raiseInputIndex = [];
let raiseButtonIndex = [];
let allInButtonIndex = [];
let whoWinIndex = [];

// setting amount of money on the start
// const startMoney = prompt('How much money do you want?')
// console.log(startMoney);

const blind = 10;
const numOfPlayers = 4;
const playersName = ['Maciek', 'Ania', 'Zosia', 'Gocha'];
let moneyOnTable = [];
let totalMoney = [];
const moneyOnStart = 500;
let pool;
let readyToFinishRound = new Array(numOfPlayers).fill(false);
let loose = new Array(numOfPlayers).fill(false);
let call = new Array(numOfPlayers).fill(false);
let fold = new Array(numOfPlayers).fill(false);
let allIn = new Array(numOfPlayers).fill(false);

// creating boxes and DOM
const creatingBoxes = function (x) {
  let containerHTML = ``;
  let whoWin = ``;
  for (let i = 0; i <= x; i++) {
    // playersName.push(`Player ${i}`);
    // playersName[i] = prompt(`Name of ${i + 1} player`);
    containerHTML += `<div class="box" id="player-${i}">
    <!--PLAYER ${i} -->
    <p>${playersName[i]}</p>
    <p class="money-display" id="money-display-${i}">7834</p>
    <p class="money-on-table" id="money-on-table-${i}">1000</p>
    <button class="fold" id="fold-${i}">Fold</button>
    <button class="call" id="call-${i}">Call/Check</button>
    <form><input class="raise-input" id="raise-input-${i}" type="number" placeholder="Raise"/>
    <button class="raise" id="raise-${i}">Raise</button></form>
    <button class="all-in" id="all-in-${i}">All In</button></div>`;
    whoWin += `<button id="win-button-${i}">${playersName[i]}</button>`;
  }
  containerIndex.innerHTML = containerHTML;
  whoWinContainerIndex.innerHTML = whoWin;
  for (let i = 0; i <= x; i++) {
    totalMoney.push(moneyOnStart);
    moneyOnTable.push(0);
    whoWinIndex.push(document.getElementById(`win-button-${i}`));
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

const updateValues = () => {
  totalMoneyIndex.forEach((i, x) => (i.innerHTML = totalMoney[x]));
  moneyOnTableIndex.forEach((i, x) => (i.innerHTML = moneyOnTable[x]));
  pool = summingPool();
  poolDisplayFunction(pool);
};
const changeMoney = function (q, indexOfButton) {
  moneyOnTable[indexOfButton] += q;
  totalMoney[indexOfButton] -= q;
  updateValues();
};
const summingPool = () => {
  return moneyOnTable.reduce((sum, current) => {
    if (!isNaN(current)) {
      return sum + current;
    }
    return sum;
  }, 0);
};
const poolDisplayFunction = x => (poolDisplayIndex.innerHTML = `Pool: ${x}`);
const gameStart = function () {
  pool = 0;
  updateValues();
  poolDisplayFunction(pool);
};
// const changeColor = function () {
//   for (let i = 0; i < numOfPlayers; i++) {
//     if (loose[i] == true) opacity0(i);
//   }
// };
const checkStatus = function () {
  for (let i = 0; i < numOfPlayers; i++) {
    if (moneyOnTable[i] == 0 && totalMoney[i] == 0) {
      //loose
      loose[i] = true;
      boxIndex[i].style.opacity = 0;
      visibility(i);
      // totalMoney[i] = undefined;
      // moneyOnTable[i] = undefined;
      whoWinIndex[i].style.visibility = 'hidden';
      whoWinIndex[i] = undefined;
      boxIndex[i] = undefined;
      // moneyOnTableIndex[i] = undefined;
      foldButtonIndex[i] = undefined;
      callButtonIndex[i] = undefined;
      raiseInputIndex[i] = undefined;
      raiseButtonIndex[i] = undefined;
      allInButtonIndex[i] = undefined;
      moneyOnTable[i] = undefined;
      totalMoney[i] = undefined;
    } else if (fold[i] == true) {
      redBox(i);
    } else if (allIn[i] == true) {
      greenBox(i);
    } else if (
      moneyOnTable[i] >= Math.max.apply(null, moneyOnTable) &&
      moneyOnTable[i] != 0
    ) {
      greenBox(i);
    } else {
      whiteBox(i);
    }
  }
};
const greenBox = w => (boxIndex[w].style.backgroundColor = 'lightgreen');
const whiteBox = w => (boxIndex[w].style.backgroundColor = 'white');
const redBox = w => (boxIndex[w].style.backgroundColor = 'rgb(210, 80, 102)');
const visibility = w => (boxIndex[w].style.visibility = 'hidden');

/////////////////////////////////////

/////////////////////////////////////
creatingBoxes(numOfPlayers - 1);
gameStart();
/////////////////////////////////////

/////////////////////////////////////

// Fold buttons
foldButtonIndex.forEach((buttonIndex, indexOfButton) => {
  buttonIndex.addEventListener('click', function (e) {
    e.preventDefault();
    readyToFinishRound[indexOfButton] = true;
    fold[indexOfButton] = true;
    checkStatus();
  });
});

// Call/Check buttons
callButtonIndex.forEach((buttonIndex, indexOfButton) => {
  buttonIndex.addEventListener('click', function (e) {
    e.preventDefault();
    if (moneyOnTable[indexOfButton] >= Math.max.apply(null, moneyOnTable)) {
      call[indexOfButton] = true;
    } else if (
      moneyOnTable[indexOfButton] < Math.max.apply(null, moneyOnTable)
    ) {
      call[indexOfButton] = true;
      console.log(Math.max.apply(null, moneyOnTable));
      changeMoney(
        Math.max.apply(null, moneyOnTable) - moneyOnTable[indexOfButton],
        indexOfButton
      );
    }
    updateValues();
    checkStatus();
  });
});

// Raise buttons
raiseButtonIndex.forEach((buttonIndex, indexOfButton) => {
  buttonIndex.addEventListener('click', function (e) {
    e.preventDefault();
    const raiseInput = Number(raiseInputIndex[indexOfButton].value);
    if (raiseInput > 0) {
      console.log(raiseInput);
      raiseInputIndex[indexOfButton].value = '';
      changeMoney(raiseInput, indexOfButton);
      call[indexOfButton] = true;
      checkStatus();
    }
  });
});

// All In buttons
allInButtonIndex.forEach((buttonIndex, indexOfButton) => {
  buttonIndex.addEventListener('click', function (e) {
    e.preventDefault();
    changeMoney(totalMoney[indexOfButton], indexOfButton);
    readyToFinishRound[indexOfButton] = true;
    allIn[indexOfButton] = true;
    checkStatus();
  });
});

// All blind button
blindAllIndex.addEventListener('click', function (e) {
  e.preventDefault();
  if (moneyOnTable.indexOf(0) !== -1) {
    totalMoney = totalMoney.map(i => i - blind);
    moneyOnTable = moneyOnTable.map(i => i + blind);
    updateValues();
    blindAllIndex.style.visibility = 'hidden';
  }
});

// Who won the round?
whoWinIndex.forEach((buttonIndex, indexOfButton) => {
  buttonIndex.addEventListener('click', function (e) {
    e.preventDefault();
    totalMoney[indexOfButton] += pool;
    pool = 0;
    moneyOnTable = new Array(numOfPlayers).fill(0);
    call = new Array(numOfPlayers).fill(false);
    fold = new Array(numOfPlayers).fill(false);
    allIn = new Array(numOfPlayers).fill(false);
    updateValues();
    checkStatus();
  });
});
