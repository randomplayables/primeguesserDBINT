import React from 'react'
import type { Guess } from '../types'

interface GuessListProps {
  guesses: Guess[]
}

const GuessList: React.FC<GuessListProps> = ({ guesses }) => {
  return (
    <ul className="guess-list">
      {guesses.map((guess, index) => (
        <li key={index}>
          Guess {index + 1}: {guess.guess} - {guess.feedback}
        </li>
      ))}
    </ul>
  )
}

export default GuessList