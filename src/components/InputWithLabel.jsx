/* eslint-disable react/prop-types */
//reusable component

import { Fragment, useEffect, useRef } from "react";

export default function InputWithLabel({value,onInputChange,id,type="text",children,isFocused}){
    const inputRef = useRef();
    useEffect(()=>{
      if(isFocused  && inputRef.current){
        inputRef.current.focus();
      }
    },[isFocused]);
    return (
      <Fragment>
        <label htmlFor={id}>{children}</label>
        <input onChange={onInputChange} type={type} id={id} value={value} ref={inputRef}/>
        <p>{value}</p>
      </Fragment>
    )
  }