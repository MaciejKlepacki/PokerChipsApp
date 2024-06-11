'use strict';

///////////////////////////////////////
// INDEXES

// main indexes
const poolDisplayIndex = document.querySelector('#current-pool');
const containerIndex = document.querySelector('.container');
const currentPhaseIndex = document.querySelector('#current-phase');
const nextRoundButtonIndex = document.querySelector('#next-round');
const blindAllIndex = document.querySelector('#blind-all');

// winners indexes
const whoWinContainerIndex = document.querySelector('#whoWin');
const containerWinnersIndex = document.querySelector('#container-winners');

// settings indexes
const allStartIndex = document.querySelector('.all-start');
const startInputBoxIndex = document.querySelector('.start-input-input');
const submitButtonIndex = document.querySelector('#submit-button');
const informationIndex = document.querySelector('#information-input');
const moneyOnStartSettingIndex = document.querySelector('#money-on-start-setting');
const blindSettingIndex = document.querySelector('#blind-setting');
const numberOfPlayersSetting = document.querySelector('#number-of-players-setting');
const namesOfPlayersSetting = document.querySelector('#names-of-players-setting');
const startGameButtonIndex = document.querySelector('#start-game-button');

// boxes indexes
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

///////////////////////////////////////

let moneyOnStart;
let blind;
let numOfPlayers;
let playersName = [];
let settingPhase = 0;
let currentName = 0;

const hidingAtStart = function () {
  blindAllIndex.style.visibility = 'hidden';
  nextRoundButtonIndex.style.visibility = 'hidden';
  containerWinnersIndex.style.visibility = 'hidden';
  poolDisplayIndex.style.visibility = 'hidden';
  moneyOnStartSettingIndex.style.visibility = 'hidden';
  blindSettingIndex.style.visibility = 'hidden';
  numberOfPlayersSetting.style.visibility = 'hidden';
  namesOfPlayersSetting.style.visibility = 'hidden';
  startGameButtonIndex.style.visibility = 'hidden';
};

hidingAtStart();

let blindAll = false;
let currentPhase = 0;
const phases = ['Blind', 'flop (3 cards on the table)', 'turn (4 cards on the table)', 'river (5 cards on the table)', 'Winner?'];
let moneyOnTable = [];
let totalMoney = [];
let pool;
let looseCount = 0;
let readyToFinishRound = [];
let loose = [];
let call = [];
let fold = [];
let allIn = [];

// creating boxes and DOM
const creatingBoxes = function (x) {
  let containerHTML = ``;
  let whoWin = ``;
  for (let i = 0; i <= x; i++) {
    containerHTML += `<div class="box" id="player-${i}">
    <!--PLAYER ${i} -->
    <p>${playersName[i]}</p>
    <div class='money'>
      <p class="money-display" id="money-display-${i}">7834</p>
      <p class="money-on-table" id="money-on-table-${i}">1000</p>
      </div>
    <p id="last-action-${i}">Raised</p>
    <button class="fold" id="fold-${i}">FOLD</button>
    <button class="call" id="call-${i}">CALL/CHECK</button>
    <form><input class="raise-input" id="raise-input-${i}" type="number"/>
    <button class="raise" id="raise-${i}">RAISE</button></form>
    <button class="all-in" id="all-in-${i}">ALL IN</button></div>`;
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
const poolDisplayFunction = x => (poolDisplayIndex.innerHTML = `POT: ${x}`);
const gameStart = function () {
  pool = 0;
  updateValues();
  blindAllIndex.style.visibility = 'visible';
  blindAllIndex.innerHTML = `BLIND ALL (${blind})`;
  poolDisplayIndex.style.visibility = 'visible';
  poolDisplayFunction(pool);
  allColorBox(whiteBox);
  currentPhaseIndex.innerHTML = `PHASE: ${phases[currentPhase]}`;
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
      whoWinIndex[i].style.visibility = 'hidden';
      boxIndex[i].style.opacity = 0;
      visibility(i);
      // moneyOnTable[i] = undefined;
      moneyOnTable[i] = 0;
      totalMoney[i] = undefined;
      readyToFinishRound[i] = true;
    } else if (loose[i] == true) {
      readyToFinishRound[i] = true;
    } else if (fold[i] == true) {
      redBox(i);
      lastActionIndex[i].innerHTML = 'folded';
    } else if ((moneyOnTable[i] >= Math.max.apply(null, moneyOnTable) && moneyOnTable[i] != 0 && call[i] == true && readyToFinishRound[i] == true) || blindAll == true || allIn[i] == true) {
      greenBox(i);
      buttonsVisibility(i, 'hidden');
    } else {
      whiteBox(i);
      readyToFinishRound[i] = false;
      buttonsVisibility(i, 'visible');
      lastActionIndex[i].innerHTML = '-';
    }
    if (loose[i] == false) {
      looseCount++;
    }
  }
  updateValues();
  if (currentPhase == 4) {
    containerWinnersIndex.style.visibility = 'visible';
    nextRoundButtonIndex.style.visibility = 'hidden';
    for (let i = 0; i < numOfPlayers; i++) {
      buttonsVisibility(i, 'hidden');
      if (fold[i] == true || loose[i] == true) whoWinIndex[i].style.visibility = 'hidden';
      else whoWinIndex[i].style.visibility = 'visible';
    }
    currentPhase = -1;
  } else {
    if (readyToFinishRound.every(element => element == true)) {
      nextRoundButtonIndex.style.visibility = 'visible';
    }
  }
  if (looseCount == 1) {
    const t = loose.indexOf(false);
    buttonsVisibility(t, 'hidden');
    lastActionIndex[t].innerHTML = 'Winner';
    boxIndex[t].style.backgroundColor = 'yellow';
    blindAllIndex.style.visibility = 'hidden';
    nextRoundButtonIndex.style.visibility = 'hidden';
  }
  looseCount = 0;
};
// coloring boxes
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

/////////////////////////////////////
// adding event listeners
/////////////////////////////////////

//submit button
submitButtonIndex.addEventListener('click', function (e) {
  e.preventDefault();
  const input = Number(startInputBoxIndex.value);
  const inputString = startInputBoxIndex.value;
  if (settingPhase == 0 && typeof input === 'number' && !isNaN(input) && input > 0 && input % 1 === 0) {
    moneyOnStart = input;
    startInputBoxIndex.value = '';
    moneyOnStartSettingIndex.style.visibility = 'visible';
    moneyOnStartSettingIndex.innerHTML = `Money on start: ${moneyOnStart}`;
    informationIndex.innerHTML = `Please enter the BLIND value (from 1 to ${moneyOnStart - 1})`;
    settingPhase++;
  } else if (settingPhase == 1 && typeof input === 'number' && !isNaN(input) && input > 0 && input % 1 === 0 && input < moneyOnStart) {
    blind = input;
    startInputBoxIndex.value = '';
    blindSettingIndex.style.visibility = 'visible';
    blindSettingIndex.innerHTML = `Blind: ${blind}`;
    informationIndex.innerHTML = 'Please enter the number of players (from 2 to 10)';
    settingPhase++;
  } else if (settingPhase == 2 && typeof input === 'number' && !isNaN(input) && input > 0 && input % 1 === 0 && input <= 10 && input >= 2) {
    numOfPlayers = input;
    startInputBoxIndex.value = '';
    numberOfPlayersSetting.style.visibility = 'visible';
    numberOfPlayersSetting.innerHTML = `Number of players: ${numOfPlayers}`;
    informationIndex.innerHTML = `Please enter the name of the ${currentName + 1} player`;
    settingPhase++;
  } else if (settingPhase == 3) {
    playersName.push(inputString);
    startInputBoxIndex.value = '';
    namesOfPlayersSetting.style.visibility = 'visible';
    namesOfPlayersSetting.innerHTML = `Names of players: ${playersName}`;
    currentName++;
    informationIndex.innerHTML = `Please enter the name of the ${currentName + 1} player`;
  }
  if (currentName == numOfPlayers) {
    startGameButtonIndex.style.visibility = 'visible';
    startInputBoxIndex.style.visibility = 'hidden';
    informationIndex.style.visibility = 'hidden';
    submitButtonIndex.style.visibility = 'hidden';
    readyToFinishRound = new Array(numOfPlayers).fill(false);
    loose = new Array(numOfPlayers).fill(false);
    call = new Array(numOfPlayers).fill(false);
    fold = new Array(numOfPlayers).fill(false);
    allIn = new Array(numOfPlayers).fill(false);
  }
});

// START GAME BUTTON
startGameButtonIndex.addEventListener('click', function () {
  allStartIndex.style.display = 'none';
  creatingBoxes(numOfPlayers - 1);
  gameStart();
  ///////////////////////////////////////

  // adding event listeners to box buttons

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
      } else if (moneyOnTable[indexOfButton] < Math.max.apply(null, moneyOnTable)) {
        if (moneyOnTable[indexOfButton] + totalMoney[indexOfButton] > Math.max.apply(null, moneyOnTable)) {
          call[indexOfButton] = true;
          readyToFinishRound[indexOfButton] = true;
          lastActionIndex[indexOfButton].innerHTML = 'Called';
          changeMoney(Math.max.apply(null, moneyOnTable) - moneyOnTable[indexOfButton], indexOfButton);
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
      e.preventDefault();
      blindAllIndex.style.visibility = 'hidden';
      const raiseInput = Number(raiseInputIndex[indexOfButton].value);
      if (raiseInput > 0 && raiseInput <= totalMoney[indexOfButton]) {
        if (raiseInput + moneyOnTable[indexOfButton] > Math.max.apply(null, moneyOnTable)) {
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
      for (let i = 0; i < numOfPlayers; i++) {
        if (loose[i] == false && fold[i] == false) {
          totalMoney[i] -= blind;
          moneyOnTable[i] += blind;
        }
        blindAll = true;
        buttonsVisibility(i, 'hidden');
        lastActionIndex[i].innerHTML = 'Blind';
      }
      checkStatus();
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

  // Who won the round?
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
});
