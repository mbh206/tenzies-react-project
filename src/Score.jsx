import React from 'react'

export default function Score(props) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || []
    const currentDate = new Date().toLocaleString() + ""
    const score = {
        date: currentDate,
        rolls: props.count
    }
    
    props.tenzies ? highScores.push(score) && localStorage.setItem("highScores", JSON.stringify(highScores)) : 
    console.log(highScores)

    const rankedScores = [...highScores].sort((a, b) => a.rolls - b.rolls)
    
    return (
        <div className='score-container'>
            <p>Your Tenzies High Scrores!</p>
            <div className="score-tracker">
                <div className='date-container '>
                    <p className='title'>DATE</p>
                    {rankedScores.map(score => <p>{score.date}</p>)}
                </div>
                <div className='roll-container'>
                    <p className='title'>ROLLS</p>
                    {rankedScores.map(score => <p>{score.rolls}</p>)}
                </div>
            </div>
            <button className='btn-clear' onClick={() => localStorage.clear()}>Clear scores</button>
        </div>
    )
}