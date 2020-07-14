import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [items, setItems] = useState([])
  const [count, setCount] = useState(() => { return 1 })

  const BASE_URL = 'https://opentdb.com/api.php?amount=1'

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(json => setItems(json.results))
      }, [count])

  function nextQuestion() {
    setCount((count) => count + 1)
  }

  function showCorrect() {
    document.getElementsByClassName("correct-ans")[0].style.display = "block";
    document.getElementsByClassName("next-container")[0].style.display = "block";
  }

  return (
    <>
      {items.map(item => {
        const answers = item.incorrect_answers.concat(item.correct_answer).sort(() => 0.5 - Math.random())

        return <div key={uuidv4()}>
          <div className="q-num">Question number {count}</div>
          <div className="question">{item.question}</div>

          {answers.map(answers => {
            return <div className="options-div" key={uuidv4()}>
              <button className="option-btn" onClick={showCorrect} key={uuidv4()}>{answers}</button>
            </div>
          })}

          <div className="correct-ans">Correct answer: {item.correct_answer}</div>
          <div className="next-container">
            <button onClick={nextQuestion}>Next Question</button>
          </div>
        </div>
      })}
    </>
  );
}

export default App;
