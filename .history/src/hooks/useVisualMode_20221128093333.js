import { useState } from 'react'

/*
Handles different 'view' modes for a component
*/
export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    setMode(newMode)
 /*    if (replace) {
      const newHistory = history.slice(0, -1)
      setHistory([...newHistory, newMode])
    } else {
      setHistory(oldArray => [...oldArray, newMode])
    } */

    if (!replace){
      setHistory([...history, newMode]);
    }

    /*     if (!replace) {
      setHistory([...history, newMode]);
    }
    return setMode(newMode); */
    return mode;
  }

  const back = () => {
    if (history.length !== 1) {
      setMode(...history[history.length - 2])
     setHistory(...history.slice(0, history.length - 1))
    }
    return mode;
  }

  return { mode, transition, back }
}
