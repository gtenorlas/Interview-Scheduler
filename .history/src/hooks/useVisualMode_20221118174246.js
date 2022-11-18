import { useState } from 'react'

export default function useVisualMode (initial, replace = false) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = newMode => {
    setMode(newMode)

    if (replace) {
      const newHistory = history.slice(0, -1)
      setHistory
    } else {
      setHistory(oldArray => [...oldArray, newMode])
    }
  }

  const back = () => {
    if (history.length > 1) {
      /*       console.log('history', history)
      console.log('mode', mode) */

      const newHistory = history.slice(0, -1)
      /*       console.log('newHistory',newHistory); */
      setHistory(newHistory)
      /*   console.log('history', history) */
      const prevMode = newHistory[newHistory.length - 1]
      /*   console.log('prevMode', prevMode) */
      setMode(prevMode)
      /*    console.log('mode', mode) */
    }
  }

  return { mode, transition, back }
}
