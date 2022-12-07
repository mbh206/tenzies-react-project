import { useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"
import Score from './Score'

export default function App() {
  const [count, setCount] = useState(0)
  const [tenzies, setTenzies] = useState(false)
  const [dice, setDice] = useState(allNewDice())

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const sameValue = dice.every(die => die.value === firstValue)
    if (allHeld && sameValue) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }
  
  function rollDice() {
    setCount(count + 1)
    if (!tenzies){setDice(oldDice => oldDice.map(die => {
      
      return die.isHeld ? 
                die :
                generateNewDie()
    }))} else {
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
    }
  }

  const diceElement = dice.map(die => <Die holdDice={() => holdDice(die.id)} key={die.id} value={die.value} isHeld={die.isHeld} />)

  return (
    <div className="App">
      <div className="inner-card">
        {tenzies && <Confetti />}
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls. <br /><br /> <strong>Lowest score wins!</strong></p>
        <div className='dice-container'>
          {diceElement}
        </div>
        <button onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <p className="count-tracker">Current rolls: <span>{count}</span></p>
        <Score count={count} tenzies={tenzies} />
      </div>
    </div>
  )
}