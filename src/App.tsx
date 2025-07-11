import React from 'react';
import usePrimeGame from './hooks/usePrimeGame';
import GuessInput from './components/GuessInput';
import GuessList from './components/GuessList';
import Message from './components/Message';

const App: React.FC = () => {
  const {
    currentGuess,
    guesses,
    message,
    isGameOver,
    handleGuessChange,
    handleGuessSubmit,
    resetGame,
  } = usePrimeGame();

  return (
    <div className="app-container">
      <h1>Prime Number Guessing Game</h1>
      <Message message={message} />
      <GuessInput
        value={currentGuess}
        onChange={handleGuessChange}
        onSubmit={handleGuessSubmit}
        disabled={isGameOver}
      />
      <GuessList guesses={guesses} />
      {isGameOver && (
        <button onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default App;
