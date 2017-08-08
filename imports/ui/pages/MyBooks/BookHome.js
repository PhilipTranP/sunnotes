import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import FloatingPlusButton from './FloatingPlusButton'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import './Books.css'

export default class BookHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      sortedBooks: []
    }
  }

  componentWillMount(){
    localStorage.setItem('token', Meteor.userId())
  }

  componentDidMount() {
     this.sortBooks()
  }

  onShelfSelect(bookId, shelf){
    BooksAPI.update(bookId, shelf).then((results) => {
      this.sortBooks() //to call getAll() API again to rerender the shelves
    })
  }

  render() {
    return (
      <div className="app">
           <div className="list-books">

             <div className="list-books-content">
                 {
                   this.state.sortedBooks.map((books, i) => {
                     return (
                         <div className="bookshelf" key={i}>
                           <BookShelf title={i} books={books} updateBooksInShelf={(bookId, shelf)=>this.onShelfSelect(bookId, shelf)} sortBooks={() => this.sortBooks()}/>
                         </div>
                       )
                     })
                 }
               </div>

             <FloatingPlusButton  />

           </div>
      </div>
    )
  }
  sortBooks(){ //TODO check with fellow devs to see if it can be simplified/DRYer!
    BooksAPI.getAll().then((books) => {
      this.setState({books})
      const filterBooks = (option) => {
        return books.filter((book) => option.test(book.shelf))
      }
      const sortedBooks =[] //result an array with three sub arrays for rendering three shelves using map.
      const read = new RegExp(escapeRegExp('read'), '') // 'i' would match 'read' wantToRead, currentlyReading.
      const wantToRead = new RegExp(escapeRegExp('wantToRead'), '')
      const currentlyReading = new RegExp(escapeRegExp('currentlyReading'), '')
      sortedBooks.push(filterBooks(currentlyReading), filterBooks(wantToRead), filterBooks(read))
      this.setState({sortedBooks})
    })
  }
}
