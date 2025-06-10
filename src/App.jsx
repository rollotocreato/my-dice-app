import React from "react";

const DICE_IMG_URLS = [
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Neon_dice.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Flaming_dice.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/93/Cartoon_network_dice.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Real_dice.svg"
];

function getRandomNumber() {
  return Math.floor(Math.random() * 11); // 0-10
}
function getRandomLetter() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const idx = Math.floor(Math.random() * 26);
  return alphabet[idx];
}

const diceConfigs = [
  { label: "How many objects?", roll: getRandomNumber, format: (v) => v },
  { label: "Setting (first letter)", roll: getRandomLetter, format: (v) => v },
  { label: "Object (first letter)", roll: getRandomLetter, format: (v) => v },
  { label: "Primary Color (first letter)", roll: getRandomLetter, format: (v) => v }
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
    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "2.5rem",
      marginTop: "40px"
    }}>
      {dice.map((value, i) => (
        <div key={i} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "120px"
        }}>
          <button
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              width: "120px",
              height: "120px",
              transition: "transform 0.17s cubic-bezier(.3,2.4,.6,1)",
              transform: popStates[i] ? "scale(1.18)" : "scale(1)"
            }}
            onClick={() => handleRoll(i)}
            title="Roll this die"
          >
            <img
              src={DICE_IMG_URLS[i]}
              alt="Die"
              width={120}
              height={120}
              style={{
                display: "block",
                pointerEvents: "none",
                userSelect: "none"
              }}
            />
          </button>
          <div style={{
            margin: "16px 0 6px",
            fontWeight: "bold",
            fontSize: "1.4em",
            letterSpacing: "0.03em"
          }}>
            {diceConfigs[i].format(value)}
          </div>
          <div style={{
            fontSize: "1em",
            color: "#444",
            textAlign: "center",
            minHeight: "2em"
          }}>
            {diceConfigs[i].label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
