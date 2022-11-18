import { useState } from 'react'

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    if (!replace) {
      setHistory(oldArray => [...oldArray, newMode])
    }
  }

  const back = () => {
    console.log('history', history)
    console.log('mode', mode)

    setHistory(history.pop())
    console.log('history', history)
    console.log('history[history.length - 1]', history[history.length - 1])
    transition(history[history.length - 1])
    console.log('mode', mode)
  }

  return { mode, transition, back }
}
