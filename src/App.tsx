import React, { useState } from 'react'
import Words from './words.json'

export function App() {
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  )
  const random = Math.floor(Math.random() * Words.length)
  const randomWord = Words[random]

  const [chosenWord] = useState(randomWord)
  const [guesses, setGuesses] = useState<string[]>([])

  function handleGuessLetter(letter: string) {
    if (checkLetter(letter)) return
    setGuesses([...guesses, letter])
  }
  function checkLetter(letter: string) {
    return guesses.includes(letter)
  }
  function snowmanSteps(): number {
    return chosenWord
      .toUpperCase()
      .split('')
      .reduce((count, letter) => {
        return count + (checkLetter(letter) ? 1 : 0)
      }, 0)
  }

  return (
    <main className="snowman-game">
      <h1>Lets Build A Snowman!</h1>
      <img
        src={`/snowman/step_${snowmanSteps()}.png`}
        alt={`${snowmanSteps()} correct letters `}
      ></img>

      <h1>
        <div className="guessed-word">
          {chosenWord
            .toUpperCase()
            .split('')
            .map((letter) =>
              checkLetter(letter) ? (
                <span className="guessed-letter">{letter}</span>
              ) : (
                <span className="blank"> - </span>
              )
            )}
        </div>
      </h1>
      <section>
        {alphabet.map((letter: string) => (
          <button
            onClick={() => handleGuessLetter(letter)}
            disabled={checkLetter(letter)}
            key="alphabet"
          >
            {letter}
          </button>
        ))}
      </section>
    </main>
  )
}
