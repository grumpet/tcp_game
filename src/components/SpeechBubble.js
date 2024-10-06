import React, { useState } from 'react';
import './SpeechBubble.css';

const SpeechBubble = ({ question, answers, correctAnswer, onCorrectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === correctAnswer;
    setIsCorrect(isAnswerCorrect);

    // Trigger the parent callback with the answer status and the answer text
    onCorrectAnswer(isAnswerCorrect, answer);
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
    </div>
  );
};

export default SpeechBubble;
