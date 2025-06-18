import React from "react";

const DICE_IMG_URLS = [
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Neon_dice.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Flaming_dice.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Real_dice.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/31/Casino-heart-dice.svg"
];

function getRandomNumber() {
  return Math.floor(Math.random() * 11); // 0-10
}
function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * 26)];
}

const diceConfigs = [
  { label: "NUMBER OF OBJECTS", roll: getRandomNumber, format: (v) => v },
  { label: "THE TYPE OF OBJECT", roll: getRandomLetter, format: (v) => v },
  { label: "SETTING FOR THE OBJECT(S)", roll: getRandomLetter, format: (v) => v },
  { label: "PRIMARY COLOR FOR YOUR MASTERPIECE", roll: getRandomLetter, format: (v) => v }
];

function App() {
  const [dice, setDice] = React.useState([
    diceConfigs[0].roll(),
    diceConfigs[1].roll(),
    diceConfigs[2].roll(),
    diceConfigs[3].roll(),
  ]);
  const [popStates, setPopStates] = React.useState([false, false, false, false]);

  function handleRoll(idx) {
    setDice(old => old.map((v, i) => i === idx ? diceConfigs[i].roll() : v));
    setPopStates(old => old.map((val, i) => i === idx ? true : val));
    setTimeout(() => {
      setPopStates(old => old.map((val, i) => i === idx ? false : val));
    }, 180);
  }

  return (
    <div className="dice-app-container">
      <div className="dice-row">
        {dice.map((value, i) => (
          <div key={i} className="die-col">
            <button
              className="die-btn"
              style={{
                transform: popStates[i] ? "scale(1.18)" : "scale(1)"
              }}
              onClick={() => handleRoll(i)}
              title="Roll this die"
            >
              <img
                src={DICE_IMG_URLS[i]}
                alt="Die"
              />
            </button>
            <div className="die-output">{diceConfigs[i].format(value)}</div>
            <div className="die-label">{diceConfigs[i].label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
