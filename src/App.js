import React, { useState, useEffect } from 'react';
import './App.css';
import questions from './questions'
const WIN_NUMBER = 30
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
  const [won, setWon] = useState(false)
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
    setWon(false)
  }

  useEffect(() => {
    if (score.valid >= WIN_NUMBER && score.total === score.valid && window.location.hash === '#zuzka') {
      setWon(true)
    }
  }, [score])

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

  const normalBody = (
    <div>
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
    </div>
  )

  const winBody = (
    <div>
      <p> 🎉Super! Dala si to na 100%!🎉
      </p>
      <p>Za pokorenie app-ky vyhrávaš pozvanie na night out, ako pred mesiacom.</p>
      <img src="data:image/jpeg;base64,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"></img>
      <p>*podnik sa može zmeniť, to redeem, sprav screenshot a pošli na fb.</p>
      <button onClick={random} className="Button-random" type="button">Reset</button>
    </div>
  )
  return (
    <div className="App">
      <header className="App-header">
        {won ? winBody : normalBody}
      </header>
    </div>
  );
}

export default App;
