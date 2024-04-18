import {  Fragment, useEffect, useRef, useState } from "react";

function getName(name){
  return name;
}
//useState,useEffect,custom hook,reusable component
const App = () => {
  const [searchTerm,setSearchTerm]=useStorageState("search","react")
  
  const articles = [
    {
      title:"React",
      url:"https://reactjs.org/",
      num_comments:3,
      points:4,
      ojbectId:0,
    },
    {
      title:"Redux",
      url:"https://reduct.js.org/",
      num_comments:2,
      points:5,
      ojbectId:1,
    },
    {
      title:"React and Redux",
      url:"https://reduct.js.org/",
      num_comments:2,
      points:5,
      ojbectId:3,
    }
  ]
  
  function handlesearch(e){
    console.log(e.target.value);
    setSearchTerm(e.target.value)
  }
  const searchArticles = articles.filter(article=>article.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  
  return (
    <div>
      <h1>Hacker News</h1>
      <h2>Hello {getName("Caleb")}</h2>
      {/* controlled component cauz sense with state(searchTerm) */}
      <InputWithLabel onInputChange={handlesearch} value={searchTerm} id="search" isFocused>Search</InputWithLabel>
      <hr/>
      <ArticleList list={searchArticles} />
      <h3>Hello</h3>
    </div>
  )
}
//custom hook
const useStorageState = (storageKey,initialState)=>{
  const [value,setValue]=useState(localStorage.getItem(storageKey)||initialState);
  useEffect(()=>{
    localStorage.setItem("search",value)
  },[storageKey,value]);
  return [value,setValue];
}
//reusable component
// eslint-disable-next-line react/prop-types
function InputWithLabel({value,onInputChange,id,type="text",children,isFocused}){
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
// eslint-disable-next-line react/prop-types
function ArticleList({list}){
 
  console.log(list)
  return(
    <ul>
     {
      // eslint-disable-next-line react/prop-types
      list.map(item=>(<Article article={item} key={item.ojbectId}/>))
     }
    </ul>
  )
}
// eslint-disable-next-line react/prop-types
function Article({article}){
  // eslint-disable-next-line react/prop-types
  const {url,title,author,num_comments,points} = article;
  return(
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>
        {author}
      </span>
      <span>
        {num_comments}
      </span>
      <span>
        {points}
      </span>
    </li>
    
  )
}
export default App
