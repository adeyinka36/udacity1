import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'
import{ Book} from './Book/Book'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    search:[],
    books:[],
    showSearchPage: false
  }

  componentDidMount=()=>{
BooksAPI.getAll().then(res=>{
  console.log(res)
  this.setState(prev=>({
    books:res
  }))
})
  }


  changeShelf=(book,shelf)=>{
    shelf.persist()
  
    BooksAPI.update(book,shelf.target.value).then(()=>{
      BooksAPI.getAll().then(res=>{
        console.log(res)
        this.setState(prev=>({
          books:res
        }))
      })
    })
  }


  find=(q)=>{
    q.persist()
    BooksAPI.search(q.target.value).then(res=>this.setState(prev=>({search:res})))
  }

  render() {
    
    let read,wantToRead,currentlyReading
if(this.state.books){
   read=this.state.books.filter(book=>book.shelf==="read")
   wantToRead=this.state.books.filter(book=>book.shelf==="wantToRead")
 currentlyReading=this.state.books.filter(book=>book.shelf==="currentlyReading")
}
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
              
              
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
                
                }
                <input type="text" placeholder="Search by title or author" onChange={(e)=>this.find(e)}/>
                

              </div>
            </div>
            <div className="search-books-results">
            
                  <div className="bookshelf-books">
              <ol className="books-grid">
                { this.state.search?this.state.search.map(book=><Book data={book} key={book.id} search={"none"} changeShelf={this.changeShelf}/>):<p>no result</p>}
              </ol>
           
            </div>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     {currentlyReading.length?currentlyReading.map(book=>
                       <Book data={book} key={book.id} changeShelf={this.changeShelf}/>
                     ):<p>No books for this section</p>}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {wantToRead.length?wantToRead.map(book=>
                       <Book data={book} key={book.id} changeShelf={this.changeShelf}/>
                     ):<p>No books for this section</p>}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {read.length?read.map(book=>
                       <Book data={book} key={book.id} changeShelf={this.changeShelf}/>
                     ):<p>No books for this section</p>}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp