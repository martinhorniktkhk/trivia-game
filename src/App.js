import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [items, setItems] = useState([]);
  const [clickable, setClickable] = useState(true);
  const [count, setCount] = useState(1);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);

  const BASE_URL = 'https://opentdb.com/api.php?amount=1'

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(json => setItems(json.results))
  }, [count])
  
  useEffect(() => {
    if ((correct + wrong) === count) {
      document.getElementsByClassName("correct-ans")[0].style.display = "block";
      document.getElementsByClassName("next-container")[0].style.display = "block";
    }
  })

  function nextQuestion() {
    setCount(count + 1);
    setClickable(true);
  }

  function sortAnswers() {
    var answers = items[0].incorrect_answers.concat(items[0].correct_answer);

    for (let i = answers.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  }
  
  function showCorrect(selected) {
    setClickable(false);
    if (items[0].correct_answer === selected) {
      setCorrect(correct + 1);
    }
    else {
      setWrong(wrong + 1);
    }
  }

  return (
    <>
      {items.map(item => {
        const answers = sortAnswers();

        return <div className="content" key={uuidv4()}>
          <div className="q-num">Question number {count}</div>
          <div>Correct answers: {correct}</div>
          <div>Wrong answers: {wrong}</div>
          <div className="question" dangerouslySetInnerHTML={{__html: item.question}}></div>

          <div className="options-group">
            {answers.map(option => {
              return <div className="option-btn" onClick={() => clickable ? showCorrect(option) : null} key={uuidv4()} dangerouslySetInnerHTML={{ __html: option }}></div>
            })}
          </div>
          
          <div className="correct-ans">Correct answer: {item.correct_answer}</div>
          <div className="correct-ans" dangerouslySetInnerHTML={{ __html: item.correct_answer }}></div>
          <div className="next-container">
            <div onClick={nextQuestion}>Next Question</div>
          </div>
        </div>
      })}
    </>
  );
}

export default App;
