import { useState } from 'react'

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = newMode => {
    setMode(newMode)

    setHistory(oldArray => [...oldArray, newMode])
  }

  const back = () => {
    if (history.length>1) {}
    console.log('history', history)
    console.log('mode', mode)

    setHistory(history.pop())
    console.log('history', history)
    const prevMode = history[history.length - 1]
    console.log('prevMode', prevMode)
    setMode(prevMode)
    console.log('mode', mode)
  }

  return { mode, transition, back }
}
