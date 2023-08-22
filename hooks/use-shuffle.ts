"use client"
import { useState } from "react";

const shuffle = <T>(arr: T[]) : T[] => {
  const shuffledArray = [...arr];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

const useShuffle = <T>(arr: T[]) => {
  const [array, setArray] = useState<T[]>(shuffle<T>(arr))
  
  const setNewArray = (array: T[]) => {
    setArray(shuffle<T>(array))
  }

  return { array , setNewArray }
}

export default useShuffle;