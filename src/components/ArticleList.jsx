/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { memo, useState } from "react";
import "./ArticleList.css"
import {sortBy} from "lodash"
//import {ReactComponent as Tick} from "../Tick.svg"
const SORTINGS = {
  NONE:(list)=>list,
  TITLE:(list)=>sortBy(list,"title"),
  AUTHOR:(list)=>sortBy(list,"author"),
  COMMENT:(list)=>sortBy(list,"num_comments").reverse(),
  POINT:(list)=>sortBy(list,"points").reverse()

}
 const ArticleList=memo(({list,handleRemoveStory})=>{
  const {sort,setSort} = useState({
    sortKey:"NONE",
    isReverese:false,
  })
  const handleSort = (sortKey)=>{
    const isReverse = sort.sortKey === sortKey && !sort.isReverese;
    setSort({sortKey:sortKey,isReverse:isReverse});
  }
  const sortFunction=SORTINGS[sort.sortKey];
  const sortedList = sort.isReverese?sortFunction(list).reverse():sortFunction(sort);
  return(
    <ul className="items-container">
      <li style={{display:"flex",fontWeight:"500",padding:"14px 0"}}>
        <span className={{width:"40%"}}><button onClick={()=>handleSort("TITLE")}>Title</button></span>
        <span className={{width:"30%"}}><button onClick={()=>handleSort("AUTHOR")}>Author</button></span>
        <span className={{width:"10%"}}><button onClick={()=>handleSort("COMMENT")}>COMMENTS</button></span>
        <span className={{width:"10%"}}><button onClick={()=>handleSort("POINT")}>Points</button></span>
        <span className={{width:"10%"}}>Actions</span>
      </li>
     {
      
      sortedList.map(item=>(<Article key={item.objectID} article={item} handleRemoveStory={handleRemoveStory}/>))
     }
    </ul>
  )
 })
  function Article({article,handleRemoveStory}){

    const {url,author,title,num_comments,points} = article;
    return(
      <li className="item">
        <span style={{width:"40%"}}>
          <a href={url}>{title}</a>
        </span>
        <span style={{width:"30%"}}>
          {author}
        </span>
        <span style={{width:"10%"}}>
          {num_comments}
        </span>
        <span style={{width:"10%"}}>
          {points}
        </span>
        {/* <Tick height="18px" width="18px"/> */}
        <button  style={{width:"8%"}} className="button" onClick={()=>handleRemoveStory(article)}>
         
         delete
        </button>
      </li>
      
    )
  }
  export default ArticleList;