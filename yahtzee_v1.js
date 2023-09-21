// yahtzee_v1.js by Jason The

const dicefaces = [1, 2, 3, 4, 5, 6];
let DiceRollsLeft = 4;
let dice = document.querySelectorAll("game-dice");
console.log(dice);
let allDice = Array.from(dice);
let score = 0;
 const rollsLeftbox = document.getElementById('DiceRollsLeftBox');
 rollsLeftbox.textContent = "4";
let roundsLeft = 12;

let DiceRolled = [];
document.addEventListener("roll-dice", (e) => {
  console.log(e.detail);
  if (e.detail.name === "dice-rolled") {
    DiceRolled = [];
    console.log(e.detail.dice.map(x => x.value));
    e.detail.dice.map(x => x.value);
    e.detail.dice.map(x => DiceRolled.push(x.value));
    DiceRollsLeft--;
    rollsLeftbox.textContent--; 
  }
  console.log(DiceRolled);
});

//score notatie klikken
document.getElementById("scoreboard").addEventListener("click", (event) => {
  const target = event.target;
  const IsValidFieldLower = target.classList.contains("LowerGridContainer");
  const IsValidFieldUpper = target.classList.contains("UpperGridContainer");
  const hasStarted = DiceRollsLeft <= 3;
  const hasNotEnded = roundsLeft > 0;
  console.log(hasNotEnded, roundsLeft);
  const scoreLocked = target.classList.contains("scoreLock");
  console.log(DiceRolled);
  const possibleDiceFaces = [1, 2, 3, 4, 5, 6];
  const counts = [0];
  possibleDiceFaces.forEach((number) => {
    let i = 0
    DiceRolled.map(dice => {
      if (dice == number) i++;

    })
    counts.push(i);
  });
  console.log(counts);
  function reducer(accumulator, currentvalue, index){
    const returns = accumulator + currentvalue;
    return returns
  }
  let diceScoring = DiceRolled.reduce(reducer)
  function countDiceandDisplay(el) {
    score += diceScoring;
    el.textContent = diceScoring;
    console.log("valid score");
  }

  if (!hasNotEnded){
    alert("game over! Total score is " + score);
  }

  if (hasStarted && !scoreLocked) {
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
            uppergridScoreBoxes[index+1]
          );
          uppergridScoreBoxes[index].innerHTML = index * count;
          score += index * count;
          roundsLeft--;
        }
        DiceRollsLeft = 4;
        rollsLeftbox.textContent = "4";
        console.log("rolls reset");
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
            roundsLeft--;
            console.log("invalid score");
          }
          break;

        case fourOfaKind:
          if (counts.some((count) => count >= 4)) {
            countDiceandDisplay(fourOfaKind);
          } else {
            score += 0;
            fourOfaKind.textContent = "0";
            roundsLeft--;
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
            roundsLeft--;
            console.log("valid score");
          } else {
            score += 0;
            fullHouse.textContent = "0";
            roundsLeft--;
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
            roundsLeft--;
            console.log("valid score");
          } else {
            score += 0;
            smallStraight.textContent = "0";
            roundsLeft--;
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
            roundsLeft--;
            console.log("valid score");
          } else {
            score += 0;
            largeStraight.textContent = "0";
            roundsLeft--;
            console.log("invalid score");
          }
          break;
        case yahtzee:
          if (counts.some((count) => count === 5)) {
            score += 50;
            yahtzee.textContent = "50";
            roundsLeft--;
            console.log("valid score");
          } else {
            score += 0;
            yahtzee.textContent = "0";
            roundsLeft--;
            console.log("invalid score");
          }
          break;
        case chance:
          countDiceandDisplay(chance);
          roundsLeft--;
          break;
        default:
          console.log("error");
          break;
      }
      console.log(score);
      DiceRollsLeft = 4;
      rollsLeftbox.textContent = "4";
      console.log("rolls reset");
    } else {
      console.log("game not valid");
    }
    target.classList.add("scoreLock");
    target.style.backgroundColor="tomato";
    let totalscorebox = document.getElementById("scoreBoxTotalScore");
    totalscorebox.innerHTML = score;
  }
});