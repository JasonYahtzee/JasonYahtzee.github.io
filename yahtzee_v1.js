// yahtzee_v1.js by Jason The

const dicefaces = [1, 2, 3, 4, 5, 6];
let DiceRollsLeft = 4;
let score = 0;
const rollsLeftbox = document.getElementById('DiceRollsLeftBox');
rollsLeftbox.textContent = "4";
const openinfo = document.getElementById("openInstructions");
const dialogbox = document.getElementById("instructionDialog");

// Update button opens a modal dialog
openinfo.addEventListener("click", () => {
  dialogbox.showModal();
});

dialogbox.addEventListener("close", () => {
});


// dobbelsteen rollen dicerollsleft -1 en textcontent update
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

// debug dicerolled 
// let DiceRolled = [1,2,3,4,6];

//score notatie klikken
document.getElementById("scoreboard").addEventListener("click", (event) => {
  const target = event.target;
  const IsValidFieldLower = target.classList.contains("LowerGridContainer");
  const IsValidFieldUpper = target.classList.contains("UpperGridContainer");
  const hasStarted = DiceRollsLeft <= 3;
  const scoreLocked = target.classList.contains("scoreLock");
  console.log(DiceRolled);
  const possibleDiceFaces = [1, 2, 3, 4, 5, 6];
  const counts = [];
  possibleDiceFaces.forEach((number) => {
    let i = 0
    DiceRolled.map(dice => {
      if (dice == number) i++;

    })
    counts.push(i);
  });
  console.log(counts);


  function reducer(accumulator, currentvalue, index) {
    const returns = accumulator + currentvalue;
    return returns
  }
  let diceScoring = DiceRolled.reduce(reducer)
  function countDiceandDisplay(el) {
    score += diceScoring;
    el.textContent = diceScoring;
    console.log("valid score");
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
        aces,
        twos,
        threes,
        fours,
        fives,
        sixes,
      ];
      counts.map((count, index) => {
        console.log(count,
          index);
        if (target === uppergridScoreBoxes[index]) {
          console.log(
            target,
            index,
            count,
            (index+1) * count,
            uppergridScoreBoxes[index]
          );
          uppergridScoreBoxes[index].innerHTML = (index+1) * count;
          score += (index+1) * count;
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
            counts.slice(0, 4).every((count) => count >= 1) ||
            counts.slice(1, 5).every((count) => count >= 1) ||
            counts.slice(2).every((count) => count >= 1)
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
            counts.slice(0, 5).every((count) => count === 1) ||
            counts.slice(1).every((count) => count === 1)
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
      rollsLeftbox.textContent = "4";
      console.log("rolls reset");
    } else {
      console.log("game not valid");
    }
    target.classList.add("scoreLock");
    // DiceRolled.forEach((element) => {
    // //   element.classList.remove("locked")
    // })
    let totalscorebox = document.getElementById("scoreBoxTotalScore");
    totalscorebox.innerHTML = score;
  }
});