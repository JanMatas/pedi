import React, { useState, useEffect } from 'react';
import './App.css';
import questions from './questions'
function Answer(props) {
  let className
  if (props.marked && props.correct) {
    className = "Answer Answer-correct"
  } else if (props.marked && !props.correct) {
    className = "Answer Answer-incorrect"
  } else if (props.ticked) {
    className = "Answer Answer-ticked"
  } else {
    className = "Answer"
  }

  return (
    <div className={className} onClick={props.onClick}>
      <div className='Answer-checkbox'> {props.ticked && '✅'} </div>
      <div className='Answer-text'> {props.text} </div>
    </div>
  )
}

function App() {
  const [score, setScore] = useState({
    valid: 0,
    total: 0
  })
  const [marked, setMarked] = useState(false)
  const [current, setCurrent] = useState(0)
  const [ticks, setTicks] = useState(new Array(questions[current].ans.length).fill(false))

  useEffect(() => {
    setTicks(new Array(questions[current].ans.length).fill(false))
  }, [current])
  const submit = () => {
    if (marked) {
      setCurrent((current + 1) % questions.length)
      setMarked(false)

    } else {
      if (ticks.every((tick, i) => questions[current].ans[i].valid === tick)) {
        setScore({
          valid: score.valid + 1,
          total: score.total + 1
        })
      } else {
        setScore({
          valid: score.valid,
          total: score.total + 1
        })
      }
      setMarked(true)

    }

  }

  const skip = () => {
    setCurrent((current + 1) % questions.length)
    setMarked(false)

  }
  const random = () => {
    setCurrent(Math.floor(questions.length * Math.random()))
    setScore({ valid: 0, total: 0 })
    setMarked(false)
  }


  const currentQuestion = questions[current]
  const answers = currentQuestion.ans.map((ans, i) => {
    const onClick = () => {
      const newTicks = [...ticks]
      newTicks[i] = !ticks[i]
      setTicks(newTicks)
    }
    return (
      <Answer ticked={ticks[i]} onClick={onClick} key={ans.ans} marked={marked} correct={ans.valid} text={ans.ans} />
    )
  })
  return (
    <div className="App">

      <header className="App-header">
        <span title="Broken question" className="Button-next" onClick={skip}>Skip broken question > </span>

        <p>
          {currentQuestion.q}
        </p>
        {answers}
        <div>
          <button onClick={submit} className={marked ? "Button-submit" : "Button-Next"} type="button">{marked ? "Next" : "Submit!"}</button>
          <button onClick={random} className="Button-random" type="button">Random</button>
        </div>

        <p>
          {score.valid} / {score.total}
        </p>

      </header>
    </div>
  );
}

export default App;
