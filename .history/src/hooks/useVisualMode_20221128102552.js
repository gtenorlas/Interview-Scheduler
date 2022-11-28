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

  }

  const back = (onError=false) => {
    if (history.length !== 1) {
      setMode(history[history.length - 1])
    }
    if(!on)
  
  }

  return { mode, transition, back }
}
