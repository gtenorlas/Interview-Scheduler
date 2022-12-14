import { useState } from 'react'

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode,replace=false) => {
    setMode(newMode)

    if (replace) {
      const newHistory = history.slice(0, -1)
      setHistory([...newHistory, newMode])
    } else {
      setHistory(oldArray => [...oldArray, newMode])
    }
  }

  const back = () => {
    if (history.length > 1) {


      const newHistory = history.slice(0, -1)

      setHistory(newHistory)

      const prevMode = newHistory[newHistory.length - 1]

      setMode(prevMode)
      /*    console.log('mode', mode) */
    }
  }

  return { mode, transition, back }
}
