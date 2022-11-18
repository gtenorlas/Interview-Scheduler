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
    console.log('mode',mode)

    setHistory(history.filter(item => item !==mode ));
    console.log('history', history)
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back }
}
