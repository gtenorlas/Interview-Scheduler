import { useState } from 'react'

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode) => {
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
    const prevMode = history[history.length - 1];
    console.log('prevMode', prevMode);
    transition(prevMode,true);
    console.log('mode', mode)
  }

  return { mode, transition, back }
}
