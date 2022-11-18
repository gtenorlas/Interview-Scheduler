import { useState } from "react";

const transition=(mode)=>{
  return setMode(mode);
}

export default function useVisualMode(initial){
  const [state, setState] = useState({
    mode: initial,
 transition: null
  })

  const [mode,setMode] = useState(initial);

  const transition=(mode)=>{
    return setMode(mode);
  }
  

  return {mode};

}