/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {  Fragment, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import InputWithLabel from "./components/InputWithLabel";
import ArticleList from "./components/ArticleList";
import useStorageState from "./hooks/useStorageState";
import axios from "axios";
import "./index.css";
function getName(name){
  return name;
}
const API_ENDPOINT = "http://hn.algolia.com/api/v1/search?query=";
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
  ];
  const [searchTerm,setSearchTerm]=useStorageState("search","")
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
          data:state.data.filter((story)=>story.objectID!=action.payload.objectID)
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
  });
  const [url,setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  function calculateSumOfComments(items){
    return items.data.reduce((result,value)=>result+value.num_comments,0);
  }
  const sumOfComments=useMemo(()=>calculateSumOfComments(stories),[stories]);

  const handleFetch = useCallback(async ()=>{
   // if(!searchTerm) return;
    //setIsLoading(true);
    dispatchStories({type: "STORIES_FETCH_INIT"});
    try{
      const result =await axios.get(url);
        dispatchStories({
          type:"STORIES_FETCH_SUCCESS",
          payload:result.data.hits,
        })
    }catch{
        dispatchStories({type:"STORIES_FETCH_FAILURE"})
    }
  },[url]);
 
  useEffect(()=>{
  handleFetch();
  /*
  getAsyncStories().then(result=>{
    //setStories(result.data);
    dispatchStories({type:"STORIES_FETCH_SUCCESS",payload:result.data});
    //setIsLoading(false);
  })
  .catch(()=>{
    //setIsError(true)
    dispatchStories({type:"STORIES_FETCH_FAILURE"})
  });
  */
 },[handleFetch]);
  const handleRemoveStory=useCallback((item)=>{
    //const newStories = stories.filter(story=>story.objectId!=item.objectId);
    //setStories(newStories);
    dispatchStories({
      type:"REMOVE_STORY",
      //payload:newStories,
      payload:item,
    });
  },[]);
 const handleSubmit=(e)=>{
  e.preventDefault();
  setUrl(`${API_ENDPOINT}${searchTerm}`);
 }
  function handleSearch(e){
    console.log(e.target.value);
    setSearchTerm(e.target.value)
  }
  const searchArticles = stories.data.filter(item=>item.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
 
  return (
    <section className="container">
      <h1 className="headline">Hacker News</h1>
      <h2>Hello {getName("Caleb")}</h2>
      {/* controlled component cauz sense with state(searchTerm) */}
      <form onSubmit={handleSubmit}>
      <InputWithLabel onInputChange={handleSearch} value={searchTerm} id="search" isFocused>Search</InputWithLabel>
      <button type="submit">Search</button>
      <hr/>
      {
        stories.isError?<p>Something went wrong!</p>:null
      }
      {
        stories.isLoading?(<p>Loading....</p>):( <ArticleList list={stories.data} handleRemoveStory={handleRemoveStory}/>)
      }
     
      </form>
    </section>
  )
}




export default App
