'use strict';

// main
const poolDisplayIndex = document.querySelector('#current-pool');
const containerIndex = document.querySelector('.container');
const whoWinContainerIndex = document.querySelector('#whoWin');
const blindAllIndex = document.querySelector('#blind-all');
const containerWinnersIndex = document.querySelector('#container-winners');
const nextRoundButtonIndex = document.querySelector('#next-round');
const currentPhaseIndex = document.querySelector('#current-phase');

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
let blindAll = false;
const numOfPlayers = 4;
const playersName = ['Maciek', 'Ania', 'Zosia', 'Gocha'];
let currentPhase = 0;
const phases = [
  'Blind',
  'flop (3 cards on the table)',
  'turn (4 cards on the table)',
  'river (5 cards on the table)',
  'Winner?',
];
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
  containerWinnersIndex.style.visibility = 'hidden';
  nextRoundButtonIndex.style.visibility = 'hidden';
  poolDisplayFunction(pool);
};

const checkStatus = function () {
  for (let i = 0; i < numOfPlayers; i++) {
    if (moneyOnTable[i] == 0 && totalMoney[i] == 0) {
      //loose
      loose[i] = true;
      boxIndex[i].style.opacity = 0;
      visibility(i);
      whoWinIndex[i].style.visibility = 'hidden';
      moneyOnTable[i] = undefined;
      totalMoney[i] = undefined;
    } else if (fold[i] == true) {
      redBox(i);
    } else if (allIn[i] == true) {
      greenBox(i);
    } else if (
      (moneyOnTable[i] >= Math.max.apply(null, moneyOnTable) &&
        moneyOnTable[i] != 0 &&
        call[i] == true &&
        readyToFinishRound[i] == true) ||
      blindAll == true
    ) {
      greenBox(i);
    } else {
      whiteBox(i);
      readyToFinishRound[i] = false;
    }
  }
  updateValues();
  console.log(readyToFinishRound);
  if (readyToFinishRound.every(element => element == true)) {
    nextRoundButtonIndex.style.visibility = 'visible';
  }
};
const greenBox = w => (boxIndex[w].style.backgroundColor = 'lightgreen');
const whiteBox = w => (boxIndex[w].style.backgroundColor = 'white');
const redBox = w => (boxIndex[w].style.backgroundColor = 'rgb(210, 80, 102)');
const visibility = w => (boxIndex[w].style.visibility = 'hidden');
const allColorBox = function (color) {
  for (let i = 0; i < numOfPlayers; i++) {
    color(i);
  }
};
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
    if (moneyOnTable[indexOfButton] == Math.max.apply(null, moneyOnTable)) {
      call[indexOfButton] = true;
      readyToFinishRound[indexOfButton] = true;
    } else if (
      moneyOnTable[indexOfButton] < Math.max.apply(null, moneyOnTable)
    ) {
      call[indexOfButton] = true;
      readyToFinishRound[indexOfButton] = true;
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
    blindAllIndex.style.visibility = 'hidden';
    e.preventDefault();
    const raiseInput = Number(raiseInputIndex[indexOfButton].value);
    if (
      raiseInput + moneyOnTable[indexOfButton] >
      Math.max.apply(null, moneyOnTable)
    ) {
      readyToFinishRound[indexOfButton] = true;
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
    readyToFinishRound = new Array(numOfPlayers).fill(true);
    totalMoney = totalMoney.map(i => i - blind);
    moneyOnTable = moneyOnTable.map(i => i + blind);
    blindAll = true;
    // updateValues();
    checkStatus();
    allColorBox(greenBox);
    blindAll = false;
    blindAllIndex.style.visibility = 'hidden';
  }
});

// Button Next Round
nextRoundButtonIndex.addEventListener('click', function () {
  allColorBox(whiteBox);
  nextRoundButtonIndex.style.visibility = 'hidden';
  currentPhase++;
  currentPhaseIndex.innerHTML = `Phase: ${phases[currentPhase]}`;
  readyToFinishRound = new Array(numOfPlayers).fill(false);
  if (currentPhase == 4) {
    containerWinnersIndex.style.visibility = 'visible';
    currentPhase = -1;
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
    checkStatus();
    blindAllIndex.style.visibility = 'visible';
    containerWinnersIndex.style.visibility = 'hidden';
  });
});
