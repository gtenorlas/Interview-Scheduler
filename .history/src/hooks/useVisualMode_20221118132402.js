import { useState } from 'react'

const transition = mode => {
  return setMode(mode)
}

export default function useVisualMode (initial) {


const [mode, setMode] = useState(initial)

  const transition = newMode => {
    setMode(newMode);
  }

  const back = oldMode => {
    setMode(oldMode);
  }

  return {mode, transition, back}
}