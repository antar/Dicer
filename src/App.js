import React from 'react'
import Navigation from './components/Navigation'
import Die from './components/Die'
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'
import './index.css'

export default function App() {
  const [dice, setDice] = React.useState(createRandomDice())
  const [winner, setWinner] = React.useState(false)
  const [rollCounter, setRollCounter] = React.useState(0)

  React.useEffect(() => {
    const allSelected = dice.every(die => die.isSelected)
    const firstValue = dice[0].value
    const allHaveSameValues = dice.every(die => die.value === firstValue)
    if (allSelected && allHaveSameValues) {
      setWinner(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isSelected: false,
      id: nanoid()
    }
  }

  function createRandomDice() {
    const numbers = []
    for (let i = 0; i < 10; i++) {
      numbers.push(generateNewDie())
    }
    return numbers
  }

  function toggleDie(id) {
    setDice(prevDie => prevDie.map(die => {
      return die.id === id ? { ...die, isSelected: !die.isSelected } : die
    }))
  }

  function toggleRoll() {
    if (!winner) {
      setDice(prevDie => prevDie.map(die => {
        return die.isSelected ? die : generateNewDie()
      }))
      setRollCounter(prevCount => prevCount + 1)
    } else {
      setWinner(false)
      setDice(createRandomDice())
      setRollCounter(0)
    }
  }

  const allDice = dice.map(number => <Die value={number.value} key={number.id} isSelected={number.isSelected} toggleDie={() => toggleDie(number.id)} />)

  return (
    <main>
      {winner && <Confetti />}
      <Navigation />
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">{allDice}</div>
      <button className="roll-dice" onClick={toggleRoll}>{winner ? "New Game" : "Roll"}</button>
      <p className="counter">You rolled {rollCounter} time{rollCounter === 1 ? "" : "s"}</p>
    </main>
  );
}