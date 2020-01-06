import React, { useState } from 'react';
import './App.css';
import questions from './questions'
import uuid from 'uuid'
function Answer(props) {
  const [ticked, setTicked] = useState(false)
  let className
  if (props.marked && props.correct) {
    className = "Answer Answer-correct"
  } else if (props.marked && !props.correct) {
    className = "Answer Answer-incorrect"
  } else if (ticked) {
    className = "Answer Answer-ticked"
  } else {
    className = "Answer"
  }
  return (
    <div className={className} onClick={() => setTicked(!ticked)}>
      <div className='Answer-checkbox'> {ticked && '✅'} </div>
      <div className='Answer-text'> {props.text} </div>
    </div>
  )
}

function App() {
  const [marked, setMarked] = useState(false)
  const [current, setCurrent] = useState(0)
  const submit = () => {
    if (marked) {
      setCurrent((current + 1) % questions.length)
    }
    setMarked(!marked)
  }

  const random = () => {
    setCurrent(Math.floor(questions.length * Math.random()))
    setMarked(false)
  }

  const currentQuestion = questions[current]
  const answers = currentQuestion.ans.map((ans, i) => {
    return (
      <Answer key={uuid()} marked={marked} correct={ans.valid} text={ans.ans} />
    )
  })
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {currentQuestion.q}
        </p>
        {answers}
        <div>
          <button onClick={submit} className={marked ? "Button-submit" : "Button-Next"} type="button">{marked ? "Next" : "Submit!"}</button>
          <button onClick={random} className="Button-random" type="button">Random</button>
        </div>
      </header>
    </div>
  );
}

export default App;
