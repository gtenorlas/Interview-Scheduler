import { useState } from 'react'

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    setHistory(oldArray => [...oldArray, newMode]);
  }

  const back = () => {
    console.log('history', history)
    setMode(history[history.length - 1])
    setHistory(history.filter())
  }

  return { mode, transition, back }
}
