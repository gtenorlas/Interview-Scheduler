import { useState } from 'react'

const transition = mode => {
  return setMode(mode)
}

export default function useVisualMode (initial) {


const [mode, setMode] = useState(initial)

  const transition = mode => {
    return setMode(mode);
  }

  return {transition}
}
