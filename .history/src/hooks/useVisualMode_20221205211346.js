import { useState } from 'react'

/*
Handles different 'view' modes for a component
*/
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setMode(newMode)

    if (!replace) {
      setHistory([...history, newMode])
    }


  }

  /*
  onError => false, when an error occurs. History will not be deleted as user can make multiple errors in a row
  */
  const back = (onError = false) => {
    console.log('back')
    if (history.length !== 1) {
      if (!onError) {
        setMode(history[history.length - 2])
        setHistory(history.slice(0, history.length - 1))
      } else {
        setMode(history[history.length - 1])
      }
    }
  }

  return { mode, transition, back }
}
