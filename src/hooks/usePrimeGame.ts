import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react'
import { initGameSession, saveGameData } from '../services/apiService'
import { MIN_NUMBER, MAX_NUMBER, MAX_ATTEMPTS } from '../constants'
import { generateRandomPrime } from '../utils/primes'

interface Guess {
  guess: number
  feedback: string
}

export default function usePrimeGame() {
  const [sessionId, setSessionId] = useState<string>('')
  const [targetNumber, setTargetNumber] = useState<number>(0)
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [guesses, setGuesses] = useState<Guess[]>([])
  const [message, setMessage] = useState<string>('Guess a prime number!')
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [roundNumber, setRoundNumber] = useState<number>(0)

  const startNewGame = useCallback(() => {
    const newTarget = generateRandomPrime(MIN_NUMBER, MAX_NUMBER)
    setTargetNumber(newTarget)
    setCurrentGuess('')
    setGuesses([])
    setMessage('Guess a prime number!')
    setIsGameOver(false)
    setRoundNumber(0)
  }, [])

  useEffect(() => {
    ;(async () => {
      const sessionData = await initGameSession()
      setSessionId(sessionData.sessionId)
      startNewGame()
    })()
  }, [startNewGame])

  const handleGuessChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(e.target.value)
  }, [])

  const handleGuessSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (isGameOver) return
      const guessNum = parseInt(currentGuess, 10)
      if (isNaN(guessNum)) {
        setMessage('Please enter a valid number.')
        return
      }
      if (guessNum < MIN_NUMBER || guessNum > MAX_NUMBER) {
        setMessage(`Please enter a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`)
        return
      }
      if (guesses.some(g => g.guess === guessNum)) {
        setMessage('You already guessed that number.')
        return
      }
      let feedback = ''
      if (guessNum < targetNumber) {
        feedback = 'Too low!'
      } else if (guessNum > targetNumber) {
        feedback = 'Too high!'
      } else {
        feedback = 'Correct! You guessed the prime.'
      }
      const newGuess: Guess = { guess: guessNum, feedback }
      const newRound = roundNumber + 1
      setGuesses(prev => [...prev, newGuess])
      setRoundNumber(newRound)
      setMessage(feedback)
      setCurrentGuess('')
      await saveGameData(sessionId, newRound, newGuess)
      if (guessNum === targetNumber) {
        setIsGameOver(true)
      } else if (newRound >= MAX_ATTEMPTS) {
        setIsGameOver(true)
        setMessage(`Game over! The number was ${targetNumber}.`)
        await saveGameData(sessionId, newRound, { gameOver: true, targetNumber })
      }
    },
    [currentGuess, guesses, isGameOver, roundNumber, sessionId, targetNumber]
  )

  const resetGame = useCallback(() => {
    startNewGame()
  }, [startNewGame])

  return {
    currentGuess,
    guesses,
    message,
    isGameOver,
    handleGuessChange,
    handleGuessSubmit,
    resetGame,
  }
}