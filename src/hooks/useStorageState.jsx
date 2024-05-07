import { useEffect, useState } from "react";

//custom hook
const useStorageState = (storageKey,initialState)=>{
    const [value,setValue]=useState(localStorage.getItem(storageKey)||initialState);
    useEffect(()=>{
      localStorage.setItem(storageKey,value)
    },[storageKey,value]);
    return [value,setValue];
  }
  export default useStorageState;