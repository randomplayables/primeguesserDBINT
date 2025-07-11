import React, { ChangeEvent, FormEvent } from 'react'

interface GuessInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  disabled: boolean
}

const GuessInput: React.FC<GuessInputProps> = ({ value, onChange, onSubmit, disabled }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="number"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Enter your guess"
      />
      <button type="submit" disabled={disabled}>
        Guess
      </button>
    </form>
  )
}

export default GuessInput