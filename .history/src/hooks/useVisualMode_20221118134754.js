import { useState } from 'react'

const transition = mode => {
  return setMode(mode)
}

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode)
      setHistory(prev => [...prev, newMode])
    }
  }

  const back = () => {
    setMode(oldMode)
  }

  return { mode, transition, back }
}
