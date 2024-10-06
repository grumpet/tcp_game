import React, { useState } from 'react';
import './SpeechBubble.css';

const SpeechBubble = ({ question, answers, correctAnswer,onCorrectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === correctAnswer;
    setIsCorrect(answer === correctAnswer);
    if (isAnswerCorrect) {
        onCorrectAnswer(); // Trigger next question if the answer is correct
      }
  };

  return (
    <div className="speech-bubble">
      <p>{question}</p>
      <div className="answers">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={selectedAnswer === answer ? (isCorrect ? 'correct' : 'incorrect') : ''}
          >
            {answer}
          </button>
        ))}
      </div>
      {isCorrect !== null && (
        <div className="result">
          {isCorrect ? 'Correct!' : 'Incorrect!'}
        </div>
      )}
    </div>
  );
};

export default SpeechBubble;
