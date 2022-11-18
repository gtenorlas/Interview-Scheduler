import { useState } from 'react'

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setMode(newMode)

    setHistory(()history.push(newMode))
  }

  const back = () => {
    console.log('history', history)
    setMode(history[history.length - 1])
    setHistory(history.pop())
  }

  return { mode, transition, back }
}
