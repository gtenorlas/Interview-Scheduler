import { useState } from "react";

const transition

export default function useVisualMode(initial){
  const [mode,setMode] = useState(initial);

  return {mode};

}