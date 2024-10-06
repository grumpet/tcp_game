import React, { useState } from 'react';
import './App.css';
import SpeechBubble from './components/SpeechBubble';
import { FaComputer } from "react-icons/fa6";
import { FaServer } from "react-icons/fa";

function App() {
  const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "What is 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: ["Earth", "Jupiter", "Mars", "Venus"],
      correctAnswer: "Jupiter"
    },
    {
      question: "What element does 'O' represent on the periodic table?",
      answers: ["Oxygen", "Gold", "Osmium", "Iron"],
      correctAnswer: "Oxygen"
    }
  ];
  // State to manage the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // Function to handle moving to the next question only if the answer is correct
  const nextQuestion = () => {
      setCurrentQuestionIndex((prevIndex) =>
        prevIndex + 1 < questions.length ? prevIndex + 1 : 0 // Loop back to the first question after the last one
      );
    };
  return (
    <div className="App">
      {/* Upper panel */}
      <div className="upper-panel">
        {/* Upper panel content can go here if needed */}
      </div>
      
      {/* Bottom panel */}
      <div className="bottom-panel">
        {/* First column: SpeechBubble and FaComputer */}
        <div className="icon-container">
        <div className='top-icon-container'>

        { currentQuestionIndex%2===0 && (
          <SpeechBubble 
            question={questions[currentQuestionIndex].question} 
            answers={questions[currentQuestionIndex].answers} 
            correctAnswer={questions[currentQuestionIndex].correctAnswer}
            onCorrectAnswer={nextQuestion}
          />
        )}
        </div>
        <div className='bottom-icon-container'>
          <FaComputer size={200}/>
        </div>
        </div>
        
        {/* Second column: SpeechBubble and FaServer */}
        <div className="icon-container">
        <div className='top-icon-container'>
        { currentQuestionIndex%2!==0 && ( 
          <SpeechBubble 
            question={questions[currentQuestionIndex].question} 
            answers={questions[currentQuestionIndex].answers} 
            correctAnswer={questions[currentQuestionIndex].correctAnswer}
            onCorrectAnswer={nextQuestion}
          />
        )}
        </div>
          <div className='bottom-icon-container'>
          <FaServer size={200}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
