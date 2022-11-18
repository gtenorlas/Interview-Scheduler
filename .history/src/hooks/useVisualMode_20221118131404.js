import { useState } from "react";

const transition=(mode)=>{
  return setMode(mode);
}

export default function useVisualMode(initial){
  const [state, setState] = useState({
    mode, initial
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  })

  const [mode,setMode] = useState(initial);

  const transition=(mode)=>{
    return setMode(mode);
  }
  

  return {mode};

}