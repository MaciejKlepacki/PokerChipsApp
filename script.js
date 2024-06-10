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
let lastActionIndex = [];

// setting amount of money on the start
// const startMoney = prompt('How much money do you want?')
// console.log(startMoney);

const blind = 10;
let blindAll = false;
// const numOfPlayers = prompt('How many players?');
const numOfPlayers = 4;
let playersName = ['asdf', 'qwerty', 'tyui', 'lkjh'];
// for (let i = 0; i < numOfPlayers; i++) {
//   playersName[i] = String(prompt(`What's the name of ${i + 1} player?`));
// }
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
    <div class='money'>
      <p class="money-display" id="money-display-${i}">7834</p>
      <p class="money-on-table" id="money-on-table-${i}">1000</p>
      </div>
    <p id="last-action-${i}">Raised</p>
    <button class="fold" id="fold-${i}">Fold</button>
    <button class="call" id="call-${i}">Call</button>
    <form><input class="raise-input" id="raise-input-${i}" type="number"/>
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
    lastActionIndex.push(document.getElementById(`last-action-${i}`));
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
  allColorBox(whiteBox);
  for (let i = 0; i < numOfPlayers; i++) {
    lastActionIndex[i].innerHTML = '-';
  }
};
const buttonsVisibility = function (buttonIndexes, x) {
  foldButtonIndex[buttonIndexes].style.visibility = x;
  callButtonIndex[buttonIndexes].style.visibility = x;
  raiseInputIndex[buttonIndexes].style.visibility = x;
  raiseButtonIndex[buttonIndexes].style.visibility = x;
  allInButtonIndex[buttonIndexes].style.visibility = x;
};

const checkStatus = function () {
  for (let i = 0; i < numOfPlayers; i++) {
    if (moneyOnTable[i] <= 0 && totalMoney[i] <= 0) {
      //loose
      loose[i] = true;
      boxIndex[i].style.opacity = 0;
      visibility(i);
      whoWinIndex[i].style.visibility = 'hidden';
      moneyOnTable[i] = undefined;
      totalMoney[i] = undefined;
      readyToFinishRound[i] = true;
    } else if (fold[i] == true) {
      redBox(i);
      lastActionIndex[i].innerHTML = 'folded';
    } else if (
      (moneyOnTable[i] >= Math.max.apply(null, moneyOnTable) &&
        moneyOnTable[i] != 0 &&
        call[i] == true &&
        readyToFinishRound[i] == true) ||
      blindAll == true ||
      allIn[i] == true
    ) {
      greenBox(i);
      buttonsVisibility(i, 'hidden');
    } else {
      whiteBox(i);
      readyToFinishRound[i] = false;
      buttonsVisibility(i, 'visible');
      lastActionIndex[i].innerHTML = '-';
    }
  }
  updateValues();
  if (currentPhase == 4) {
    containerWinnersIndex.style.visibility = 'visible';
    nextRoundButtonIndex.style.visibility = 'hidden';
    for (let i = 0; i < numOfPlayers; i++) {
      buttonsVisibility(i, 'hidden');
      if (fold[i] == true) whoWinIndex[i].style.visibility = 'hidden';
      else whoWinIndex[i].style.visibility = 'visible';
    }
    currentPhase = -1;
  } else {
    if (readyToFinishRound.every(element => element == true)) {
      nextRoundButtonIndex.style.visibility = 'visible';
    }
  }
};
const greenBox = w => (boxIndex[w].style.backgroundColor = 'lightGreen');
const whiteBox = w => (boxIndex[w].style.backgroundColor = '#FCF5E6');
const redBox = w => (boxIndex[w].style.backgroundColor = 'salmon');
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
    buttonsVisibility(indexOfButton, 'hidden');
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
      lastActionIndex[indexOfButton].innerHTML = 'Called';
    } else if (
      moneyOnTable[indexOfButton] < Math.max.apply(null, moneyOnTable)
    ) {
      if (
        moneyOnTable[indexOfButton] + totalMoney[indexOfButton] >
        Math.max.apply(null, moneyOnTable)
      ) {
        call[indexOfButton] = true;
        readyToFinishRound[indexOfButton] = true;
        lastActionIndex[indexOfButton].innerHTML = 'Called';
        changeMoney(
          Math.max.apply(null, moneyOnTable) - moneyOnTable[indexOfButton],
          indexOfButton
        );
      } else {
        allIn[indexOfButton] = true;
        lastActionIndex[indexOfButton].innerHTML = 'All in';
        changeMoney(totalMoney[indexOfButton], indexOfButton);
        readyToFinishRound[indexOfButton] = true;
        buttonsVisibility(indexOfButton, 'hidden');
      }
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
    if (raiseInput > 0 && raiseInput <= totalMoney[indexOfButton]) {
      if (
        raiseInput + moneyOnTable[indexOfButton] >
        Math.max.apply(null, moneyOnTable)
      ) {
        lastActionIndex[indexOfButton].innerHTML = 'Raised';
        readyToFinishRound[indexOfButton] = true;
        console.log(raiseInput);
        raiseInputIndex[indexOfButton].value = '';
        changeMoney(raiseInput, indexOfButton);
        call[indexOfButton] = true;
        checkStatus();
      }
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
    lastActionIndex[indexOfButton].innerHTML = 'All in';
    blindAllIndex.style.visibility = 'hidden';
    checkStatus();
    buttonsVisibility(indexOfButton, 'hidden');
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
    for (let i = 0; i < numOfPlayers; i++) {
      buttonsVisibility(i, 'hidden');
      lastActionIndex[i].innerHTML = 'Blind';
    }
    checkStatus();
    allColorBox(greenBox);
    blindAll = false;
    blindAllIndex.style.visibility = 'hidden';
  }
});

// Button Next Phase
nextRoundButtonIndex.addEventListener('click', function () {
  for (let i = 0; i < numOfPlayers; i++) {
    if (allIn[i] == true || fold[i] == true || loose[i] == true) {
      readyToFinishRound[i] = true;
    } else {
      readyToFinishRound[i] = false;
      lastActionIndex[i].innerHTML = '-';
    }
  }
  currentPhase++;
  nextRoundButtonIndex.style.visibility = 'hidden';
  currentPhaseIndex.innerHTML = `Phase: ${phases[currentPhase]}`;

  checkStatus();
});

// TODO: Who won the round?
whoWinIndex.forEach((buttonIndex, indexOfButton) => {
  buttonIndex.addEventListener('click', function (e) {
    e.preventDefault();
    totalMoney[indexOfButton] += pool;
    pool = 0;
    call = new Array(numOfPlayers).fill(false);
    fold = new Array(numOfPlayers).fill(false);
    allIn = new Array(numOfPlayers).fill(false);
    moneyOnTable = new Array(numOfPlayers).fill(0);
    for (let i = 0; i < numOfPlayers; i++) {
      whoWinIndex[i].style.visibility = 'hidden';
      moneyOnTable[i] = 0;
      buttonsVisibility(i, 'visible');
      if (loose[i] == true) readyToFinishRound[i] = true;
    }
    checkStatus();
    blindAllIndex.style.visibility = 'visible';
    currentPhase++;
    currentPhaseIndex.innerHTML = `Phase: ${phases[currentPhase]}`;
    containerWinnersIndex.style.visibility = 'hidden';
  });
});
