import React, { useState } from 'react';
import './App.css';
import SpeechBubble from './components/SpeechBubble';
import { FaComputer } from "react-icons/fa6";
import { FaServer } from "react-icons/fa";
import questionsData1 from './database/questions1.json';  // Import the first JSON file
import questionsData2 from './database/questions2.json';  // Import the second JSON file

function App() {
  // State to manage the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [useFirstDatabase, setUseFirstDatabase] = useState(true); // Track which database is being used
  const [correctAnswers, setCorrectAnswers] = useState([]); // Track all correct answers

  // Determine which database to use
  const currentDatabase = useFirstDatabase ? questionsData1 : questionsData2;
  const currentQuestions = currentDatabase.questions; // Access questions array from the database

  // Function to handle moving to the next question only if the answer is correct
  const nextQuestion = (isCorrect, answer) => {
    if (isCorrect) {
      setCorrectAnswers(prevAnswers => [...prevAnswers, answer]); // Append the correct answer to the list
      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex + 1 < currentQuestions.length) {
          return prevIndex + 1;  // Continue in the current database
        } else {
          // Switch the database when all questions in the current database are done
          setUseFirstDatabase(!useFirstDatabase);
          return 0;  // Reset the question index for the new database
        }
      });
    }
  };

  return (
    <div className="App">
      <h1>{currentDatabase.databaseName}</h1>  {/* Display the name of the current database */}

      {/* Upper panel */}
      <div className="upper-panel">
        {correctAnswers.length > 0 ? (
          <ul>
            {correctAnswers.map((answer, index) => (
              <li key={index}>Correct Answer {index + 1}: {answer}</li>
            ))}
          </ul>
        ) : (
          <h2>Welcome to the ultimate TCP game!</h2>
        )}
      </div>

      {/* Bottom panel */}
      <div className="bottom-panel">
        {/* First column: SpeechBubble and FaComputer */}
        <div className="icon-container">
          <div className='top-icon-container'>
            {currentQuestionIndex % 2 === 0 && (
              <SpeechBubble
                question={currentQuestions[currentQuestionIndex].question}
                answers={currentQuestions[currentQuestionIndex].answers}
                correctAnswer={currentQuestions[currentQuestionIndex].correctAnswer}
                onCorrectAnswer={(isCorrect, answer) => nextQuestion(isCorrect, answer)}
              />
            )}
          </div>
          <div className='bottom-icon-container'>
            <FaComputer size={200} />
          </div>
        </div>

        {/* Second column: SpeechBubble and FaServer */}
        <div className="icon-container">
          <div className='top-icon-container'>
            {currentQuestionIndex % 2 !== 0 && (
              <SpeechBubble
                question={currentQuestions[currentQuestionIndex].question}
                answers={currentQuestions[currentQuestionIndex].answers}
                correctAnswer={currentQuestions[currentQuestionIndex].correctAnswer}
                onCorrectAnswer={(isCorrect, answer) => nextQuestion(isCorrect, answer)}
              />
            )}
          </div>
          <div className='bottom-icon-container'>
            <FaServer size={200} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
