import React from 'react'
import './index.css'
import Navigation from './components/Navigation'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  const [dice, setDice] = React.useState(createRandomDice())
  const [winner, setWinner] = React.useState(false)

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
      isHeld: false,
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
    } else {
      setWinner(false)
      setDice(createRandomDice())
    }
  }

  const allDice = dice.map(number => <Die value={number.value} key={number.id} isSelected={number.isSelected} toggleDie={() => toggleDie(number.id)} />)

  return (
    <main>
      {winner && <Confetti />}
      <Navigation />
      <div className="dice-container">
        {allDice}
      </div>
      <button className="roll-dice" onClick={toggleRoll}>{winner ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
