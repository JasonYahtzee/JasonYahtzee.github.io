// yahtzee_v0.5.js by Jason The

const dicefaces = [1, 2, 3, 4, 5, 6];
let DiceRollsLeft = 4;
let dice = document.querySelectorAll("game-dice");
console.log(dice);
let allDice = Array.from(dice);
let score = 0;
// const threeKind = [1,1,1] [2,2,2] [3,3,3] [4,4,4] [5,5,5] [6,6,6];
// const fourKind = [1,1,1,1] [2,2,2,2] [3,3,3,3] [4,4,4,4] [5,5,5,5] [6,6,6,6];
// const fullHouse = [x,x,x,y,y];
// const smallStraight = [1,2,3,4] [2,3,4,5] [3,4,5,6];
// const largeStraight = [1,2,3,4,5] [2,3,4,5,6];
// const yahtzee = [1,1,1,1,1][2,2,2,2,2] [3,3,3,3,3] [4,4,4,4,4] [5,5,5,5,5] [6,6,6,6,6];

// diceroller functie
function diceRoller() {
  allDice.forEach((element) => {
    console.log(element.classList.contains("locked"), element);
    if (DiceRollsLeft > 0 && !element.classList.contains("locked")) {
      element.setAttribute("value", [
        Math.floor(Math.random() * dicefaces.length) + 1,
      ]);
    }
  });
}
// knop functioneren
document
  .querySelector('#dice-box > [id="dRoller"]')
  .addEventListener("click", (event) => {
    diceRoller();
    DiceRollsLeft -= 1;
    console.log(DiceRollsLeft);
    console.log(allDice);
  });

//vastzetten dobbelstenen
document.addEventListener("click", (event) => {
  const target = event.target;
  console.log(target);
  console.log(target.classList);
  const isValidDice = target.classList.contains("dice");
  const hasStarted = DiceRollsLeft <= 3;
  if (isValidDice && hasStarted) {
    const locked = target.classList.contains("locked");
    // console.log(locked);
    if (locked === false) {
      target.classList.add("locked");
      console.log("dice locked");
    } else {
      target.classList.remove("locked");
      console.log("dice unlocked");
    }
  }
});

//score notatie klikken
document.getElementById("scoreboard").addEventListener("click", (event) => {
  const target = event.target;
  const IsValidFieldLower = target.classList.contains("LowerGridContainer");
  const IsValidFieldUpper = target.classList.contains("UpperGridContainer");
  const hasStarted = DiceRollsLeft <= 3;
  console.log(allDice);
  let counts = Array(7).fill(0);
  let diceScoring = allDice.reduce(
    (acc, dice) => acc + Number(dice.getAttribute("Value")),
    0
  );
  console.log(diceScoring);
  for (let die of dice) {
    counts[die.getAttribute("value")]++;
  }
  function countDiceandDisplay(el) {
    score += diceScoring;
    el.textContent = diceScoring;
    console.log("valid score");
  }
  if (hasStarted) {
    if (IsValidFieldUpper) {
      let aces = document.getElementById("ScoreboxAces");
      let twos = document.getElementById("ScoreboxTwos");
      let threes = document.getElementById("ScoreboxThrees");
      let fours = document.getElementById("ScoreboxFours");
      let fives = document.getElementById("ScoreboxFives");
      let sixes = document.getElementById("ScoreboxSixes");
      let uppergridScoreBoxes = [
        undefined,
        aces,
        twos,
        threes,
        fours,
        fives,
        sixes,
      ];
      counts.forEach((count, index) => {
        if (index > 0 && target === uppergridScoreBoxes[index]) {
          console.log(
            target,
            index,
            count,
            index * count,
            uppergridScoreBoxes[index]
          );
          uppergridScoreBoxes[index].innerHTML = index * count;
        }
      });
    }

    if (IsValidFieldLower) {
      let threeOfaKind = document.getElementById("scoreBoxTOAK");
      let fourOfaKind = document.getElementById("scoreBoxFOAK");
      let fullHouse = document.getElementById("scoreBoxFH");
      let smallStraight = document.getElementById("scoreBoxSS");
      let largeStraight = document.getElementById("scoreBoxLS");
      let yahtzee = document.getElementById("scoreBoxY");
      let chance = document.getElementById("scoreBoxC");

      switch (target) {
        case threeOfaKind:
          if (counts.some((count) => count >= 3)) {
            countDiceandDisplay(threeOfaKind);
          } else {
            score += 0;
            threeOfaKind.textContent = "0";
            console.log("invalid score");
          }
          break;

        case fourOfaKind:
          if (counts.some((count) => count >= 4)) {
            countDiceandDisplay(fourOfaKind);
          } else {
            score += 0;
            fourOfaKind.textContent = "0";
            console.log("invalid score");
          }
          break;

        case fullHouse:
          if (
            counts.some((count) => count === 3) &&
            counts.some((count) => count === 2)
          ) {
            score += 25;
            fullHouse.textContent = "25";
            console.log("valid score");
          } else {
            score += 0;
            fullHouse.textContent = "0";
            console.log("invalid score");
          }
          break;
        case smallStraight:
          if (
            counts.slice(1, 5).every((count) => count >= 1) ||
            counts.slice(2, 6).every((count) => count >= 1) ||
            counts.slice(3).every((count) => count >= 1)
          ) {
            score += 30;
            smallStraight.textContent = "30";
            console.log("valid score");
          } else {
            score += 0;
            smallStraight.textContent = "0";
            console.log("invalid score");
          }
          break;
        case largeStraight:
          if (
            counts.slice(1, 6).every((count) => count === 1) ||
            counts.slice(2).every((count) => count === 1)
          ) {
            score += 40;
            largeStraight.textContent = "40";
            console.log("valid score");
          } else {
            score += 0;
            largeStraight.textContent = "0";
            console.log("invalid score");
          }
          break;
        case yahtzee:
          if (counts.some((count) => count === 5)) {
            score += 50;
            yahtzee.textContent = "50";
            console.log("valid score");
          } else {
            score += 0;
            yahtzee.textContent = "0";
            console.log("invalid score");
          }
          break;
        case chance:
          countDiceandDisplay(chance);
          break;
        default:
          console.log("error");
          break;
      }
      console.log(score);
      DiceRollsLeft = 4;
    } else {
      console.log("game not valid");
    }
  }
});

// //score noteren
// function scorecounter() {
//   let score = 0;
//   let counts = Array(7).fill(0);
//   for (let die of dice) {
//     counts[die]++;
//   }
//   //three of a kind
//   if (counts.some((count) => count >= 3)) {
//     score += dice.reduce((a, b) => a + b);
//   }

//   //four of a kind
//   else if (counts.some((count) => count >= 4)) {
//     score += dice.reduce((a, b) => a + b);
//   }
//   //yahtzee
//   else if (counts.some((count) => count === 5)) {
//     score += 50;
//   }
//   //Full house
//   else if (
//     counts.some((count) => count === 3) &&
//     counts.some((count) => count === 2)
//   ) {
//     score += 25;
//   }
//   //small straight
//   else if (
//     counts.slice(1, 5).every((count) => count >= 1) ||
//     counts.slice(2, 6).every((count) => count >= 1) ||
//     counts.slice(3).every((count) => count >= 1)
//   ) {
//     score += 30;
//   }
//   //large straight
//   else if (
//     counts.slice(1, 6).every((count) => count === 1) ||
//     counts.slice(2).every((count) => count === 1)
//   ) {
//     score += 40;
//   }
//   //chance
//   else {
//     score += dice.reduce((a, b) => a + b);
//   }
//   return score;
// }
