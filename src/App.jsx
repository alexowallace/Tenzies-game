import Die from "./Die";
import "./App.css";
import React from "react";
import { nanoid } from "nanoid";
// import Confetti from 'react'

export default function App() {
  const [dice, setdice] = React.useState(() => randnum());

  function randnum() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function roll() {
    if (!gamewon) {
      setdice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) },
        ),
      );
    } else {
      setdice(randnum());
    }
  }

  function hold(id) {
    setdice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => {
        hold(dieObj.id);
      }}
    />
  ));

  console.log(randnum());

  const gamewon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  return (
    <>
      {/* {gamewon && <Confetti/>} */}
      <main className="app">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="container2">
          {diceElements}
          <button id="roll" onClick={roll}>
            {gamewon ? "new game " : "ROLL"}
          </button>
        </div>
      </main>
    </>
  );
}
