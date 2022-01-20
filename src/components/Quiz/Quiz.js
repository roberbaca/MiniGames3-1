import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Quiz.css"


const Quiz = () => {

  const baseURL = "https://opentdb.com/api.php?amount=1&difficulty=easy";

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [number, setNumber] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState(0);

  const scoreTag = ["Yuck!", "Poor", "Meh", "Good", "Great Job!", "Awesome!"];

  const newQuestion = async () => {
    try{
      const response = await fetch(baseURL, {
        method: "GET"
      });
      
      const data = await response.json();      
      //console.log(data.results);
      
      let dataParse = data.results[0].question.replace(/(&quot\;)/g,"\"");
      let dataParse2 = dataParse.replace(/(&#039\;)/g,"`");
      let dataParse3 = dataParse2.replace(/(&rsquo\;)/g,"'");
      let dataParse4 = dataParse3.replace(/(&eacute\;)/g,"é");
      let dataParse5 = dataParse4.replace(/(&amp\;)/g,"&");
      setQuestion(dataParse5);      
     
      let incorrect = data.results[0].incorrect_answers;
      let correct =  data.results[0].correct_answer;
      incorrect.push(correct);
      let allOptions = incorrect.sort( () => Math.random() - 0.5)
      //console.log(allOptions);
      setOptions(allOptions);
      
      if (number >= 5) {
        setNumber(1);
      } else {
        setNumber(number + 1);
      }

      setCorrectAnswer(correct);

    } catch(error) {
        console.log("error: " + error);
    }
  }

  const newGame = () => {
    setNumber(0);
    setScore(0);
    setOptions([]);
    setQuestion("");
    setCorrectAnswer("");
    newQuestion();
  }

  const guessAnswer = (e) => {
    //console.log(e.target.value);
    //console.log(correctAnswer);

    if (e.target.value === correctAnswer) {
      //console.log("correcto!");
      setScore(score + 1);
    } else {
      //console.log("mal!");
    }
    
    if (number < 5) {
      setNumber(number + 1);
      newQuestion();
    }
  }


  useEffect(() => {
    setNumber(0);
    newQuestion();
  }, [])

  return (
      <div className='quiz-game'>            
        <div className='quiz-header'>               
          <div className="quiz-title">
            <a href="https://github.com/roberbaca" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" title="GitHub"></i>
            </a>
            <h1 className="quiz-h1">Trivia!</h1>
            <a href="https://www.linkedin.com/in/roberto-baca" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" title="linkedin"></i>
            </a>
          </div>
        </div>
           
        <div className='quiz-board'>                
                     
            {number < 5 && 
            <div  className='quiz-card'>
              <div className='quiz-question'>
                <h2>Question {number + " / 5"}</h2>
                <h3>{question}</h3>
              </div>
              
              <div className='quiz-options'>
                {options.map((a, index) => <button className="option"  key={index} onClick={guessAnswer} value={options[index]} >{options[index]}</button>)}  
              </div>
            </div>            
            }                   

            {number === 5 && 
              <div className='quiz-scoreCard'>
                <div className='quiz-score'>
                  <h2>{scoreTag[score]}</h2>
                  {score === 0 && <i className="fas fa-dizzy"></i>}
                  {score === 1 && <i className="fas fa-frown"></i>}
                  {score === 2 && <i className="fas fa-meh-blank"></i>}
                  {score === 3 && <i className="fas fa-smile"></i>}
                  {score === 4 && <i className="fas fa-grin"></i>}
                  {score === 5 && <i className="fas fa-grin-beam"></i>}              
                </div>
                <h3>You scored {score} out of 5</h3>
              </div>            
            }          
        </div>     

      <div className='quiz-UI'>
        <Link to ="/"><i className="fas fa-home" title="home"></i></Link>              
        <i className="fas fa-undo-alt" title="new-game" onClick={newGame}></i>         
      </div>
  </div>
    )
}

export default Quiz

