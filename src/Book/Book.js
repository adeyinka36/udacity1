import React from "react";

export const Book = props =>{
if(!props.data.imageLinks){
  props.data.imageLinks={}
  props.data.imageLinks.smallThumbnail="https://unsplash.com/photos/RrhhzitYizg"}

    return (
        <li>
        <div className="book" >
        <div className="book-top">
        
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${props.data.imageLinks.smallThumbnail})`}}></div>
          
          <div className="book-shelf-changer">
        
            <select  value={props.search?props.search:props.data.shelf} onChange={(e)=>{e.preventDefault();props.changeShelf(props.data,e)}}>
              <option  value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          
          </div>
        </div>
        <div className="book-title">{props.data.title}</div>
        <div className="book-authors">{props.data.authors}</div>
      </div>
      </li>
    )
}


