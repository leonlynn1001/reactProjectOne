/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {  Fragment, useEffect, useReducer, useRef, useState } from "react";

function getName(name){
  return name;
}
//useState,useEffect,custom hook,reusable component
const App = () => {
  const initialStories = [
    {
      title:"React",
      url:"https://reactjs.org/",
      num_comments:3,
      points:4,
      objectId:0,
    },
    {
      title:"Redux",
      url:"https://reduct.js.org/",
      num_comments:2,
      points:5,
      objectId:1,
    },
    {
      title:"React and Redux",
      url:"https://reduct.js.org/",
      num_comments:2,
      points:5,
      objectId:2,
    }
  ]
  const [searchTerm,setSearchTerm]=useStorageState("search","")
  //const [stories,setStories]=useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setIsError] = useState(false);
  //mock API fetching
  const storiesReducer=(state,action)=>{
    switch(action.type){
      case "STORIES_FETCH_INIT":
        return {
          ...state,
          isLoading:true,
        };
      case "STORIES_FETCH_SUCCESS":
        return {
          ...state,
          isLoading:false,
          isError:false,
          data:action.payload,
        };
      case "STORIES_FETCH_FAILURE":
        return {
          ...state,
          isLoading:false,
          isError:true,
        };
      case "REMOVE_STORY":
        return {
          ...state,
          data:state.data.filter((story)=>story.objectId!=action.payload.objectId)
        };
      default:
        throw new Error();
    }
    
   
  }
  const getAsyncStories=()=>{
    return new Promise((resolve)=>setTimeout(resolve({data:initialStories}),2000))
  }
  //useReducer
  const [stories,dispatchStories]=useReducer(storiesReducer,{
    data:[],
    isLoading:false,
    isError:false
  })
  useEffect(()=>{
  setIsLoading(true);
  getAsyncStories().then(result=>{
    //setStories(result.data);
    dispatchStories({type:"SET_STORIES",payload:result.data});
    setIsLoading(false);
  })
  .catch(()=>setIsError(true));
  
 },[])
  const handleRemoveStory=(item)=>{
    //const newStories = stories.filter(story=>story.objectId!=item.objectId);
    //setStories(newStories);
    console.log(item)
    dispatchStories({
      type:"REMOVE_STORY",
      //payload:newStories,
      payload:item,
    });
  
  }
 
  function handlesearch(e){
    console.log(e.target.value);
    setSearchTerm(e.target.value)
  }
  const searchArticles = initialStories.filter(article=>article.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
 
  return (
    <div>
      <h1>Hacker News</h1>
      <h2>Hello {getName("Caleb")}</h2>
      {/* controlled component cauz sense with state(searchTerm) */}
      <InputWithLabel onInputChange={handlesearch} value={searchTerm} id="search" isFocused>Search</InputWithLabel>
      <hr/>
      {
        isError?<p>Something went wrong!</p>:null
      }
      {
        isLoading?(<p>Loading....</p>):( <ArticleList list={searchArticles} handleRemoveStory={handleRemoveStory}/>)
      }
     

     
    </div>
  )
}
//custom hook
const useStorageState = (storageKey,initialState)=>{
  const [value,setValue]=useState(localStorage.getItem(storageKey)||initialState);
  useEffect(()=>{
    localStorage.setItem(storageKey,value)
  },[storageKey,value]);
  return [value,setValue];
}
//reusable component

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

function ArticleList({list,handleRemoveStory}){
 
  console.log(list)
  return(
    <ul>
     {
  
      list.map(item=>(<Article article={item} key={item.objectId} handleRemoveStory={handleRemoveStory}/>))
     }
    </ul>
  )
}

function Article({article,handleRemoveStory}){

  const {url,title,num_comments,points} = article;
  return(
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>
        {num_comments}
      </span>
      <span>
        {points}
      </span>
      <button onClick={()=>handleRemoveStory(article)}>
        delete
      </button>
    </li>
    
  )
}
export default App
