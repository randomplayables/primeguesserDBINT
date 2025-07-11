export interface Guess {
  guess: number
  feedback: string
}

export interface GameSession {
  sessionId: string
}

export type RoundData = Guess | {
  gameOver: boolean
  targetNumber: number
}