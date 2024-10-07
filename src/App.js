import React, { useState } from 'react';
import './App.css';
import SpeechBubble from './components/SpeechBubble';
import { FaComputer } from "react-icons/fa6";
import { FaServer } from "react-icons/fa";
import questionsDataTCP from './database/tcp_questions.json';  // Import the TCP questions JSON file
import questionsDataShortTCP from './database/short_tcp_questions.json';  // Import the short TCP questions JSON file

function App() {
  // State to manage the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDatabaseIndex, setCurrentDatabaseIndex] = useState(0); // Track which database is being used (0 for TCP, 1 for Short TCP)
  const [correctAnswers, setCorrectAnswers] = useState([]); // Track all correct answers

  // Array of databases (TCP questions and Short TCP questions)
  const databases = [questionsDataTCP, questionsDataShortTCP];
  const currentDatabase = databases[currentDatabaseIndex]; // Use the current database based on the index
  const currentQuestions = currentDatabase.questions; // Access questions array from the current database

  // Function to handle moving to the next question only if the answer is correct
  const nextQuestion = (isCorrect, answer) => {
    if (isCorrect) {
      setCorrectAnswers(prevAnswers => [...prevAnswers, answer]); // Append the correct answer to the list
      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex + 1 < currentQuestions.length) {
          return prevIndex + 1;  // Continue in the current database
        } else {
          // Reset answers and move to the next database (if available)
          setCorrectAnswers([]); // Reset correct answers
          if (currentDatabaseIndex + 1 < databases.length) {
            setCurrentDatabaseIndex(currentDatabaseIndex + 1); // Move to the next database
          } else {
            setCurrentDatabaseIndex(0); // Loop back to the first database
          }
          return 0;  // Reset the question index for the new database
        }
      });
    }
  };

  return (
    <div className="App">

      {/* Upper panel */}
      <div className="upper-panel">
        {correctAnswers.length > 0 ? (
          <ul>
            {correctAnswers.map((answer, index) => (
              <p key={index}> {answer}
              {index % 2 === 0 ? ' (Computer)' : ' (Server)'}
              </p>
            ))}
          </ul>
        ) : (
          <h2>Welcome to the ultimate TCP game you are at <u>{currentDatabase.databaseName}</u> good luck!</h2>
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
