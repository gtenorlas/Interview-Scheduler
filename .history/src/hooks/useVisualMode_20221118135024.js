import { useState } from 'react'

const transition = mode => {
  return setMode(mode)
}

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setMode(newMode)
    if (replace) {
      setHistory(prev => [...prev, newMode])
    }
  }

  const back = () => {
    setMode(history[])
  }

  return { mode, transition, back }
}
