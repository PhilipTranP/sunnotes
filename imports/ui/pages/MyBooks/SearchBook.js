import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import _ from 'lodash'
import escapeRegExp from 'escape-string-regexp'
import createHistory from 'history/createBrowserHistory'
import MyBooks from '../../../api/MyBooks/myBooks'
import validate from '../../../modules/validate'
import { Link } from 'react-router-dom'
import Book from './Book'
import './SearchBook.css'

let keyWords = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

export default class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state={
      option: '',
      query: '',
      books: [],
      error:'',
      suggestKeywords: keyWords,
      updatedBooks: [],
      searchResults: [],
      filteredBooks: [],
      myBook: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderSearchResults = this.renderSearchResults.bind(this)
  }
  componentWillMount(){
    localStorage.setItem('token', Meteor.userId())
  }
  componentDidMount() {
    console.log(localStorage.token)
    this.nameInput.focus() // TODO: show placeholder when not in focus mode.
    BooksAPI.getAll()
    .then(result => {
      // If BooksApi returns anything other than array throw error and skip state updates
      if(!Array.isArray(result)) {
        throw new Error('Bad response')
      }
      return result
    })
    .then(result => this.setState({books: result}))
    .catch(e => {
      this.setState({error: 'Failed to load resources'})
    })

  }

  onShelfSelect(bookId, shelf){
    BooksAPI.update(bookId, shelf).then((results) => {
      this.sortBooks() //to call getAll() API again to rerender the shelves
    })
  }


  addToMyBooks(bookId) {
    const myBook = _.find(this.state.searchResults, {id: bookId.id})

    // this.setState({ myBook })
    // this.setState({myBook: Object.assign({}, myBook)})
    // console.log(this.state.myBook)
    // const { jacket, authors, title, descript, edition, content, summary, subjects, ISBNs, shelf } = this.state
    // const book = {
    //   _id: new Meteor.Collection.ObjectID().toHexString(),
    //   fileId: this.fileId.value.trim(),
    //   jacket: this.jacket.value.trim(),
    //   authors: this.authors.value.split( ',' ).map( ( string ) => {
    //             return string.trim();
    //           }),
    //   title: this.title.value.trim(),
    //   descript: this.descript.value.trim(),
    //   edition: this.edition.value.trim(),
    //   content: this.content.value.trim(),
    //   summary: this.summary.value.trim(),
    //
    //   subjects: this.subjects.value.split( ',' ).map( ( string ) => {
    //             return string.trim();
    //           }),
    //   ISBNs: this.ISBNs.value.split( ',' ).map( ( string ) => {
    //             return string.trim();
    //           }),
    //
    // };
      const bookData = {
           _id: myBook.id,
           title: myBook.title + " " + myBook.authors[0]
      }
      Meteor.call("myBooks.insert", bookData, (error, bookId) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert("Request sent!", 'success');
          this.setState({ myBook: null})
        }
       })
  }


  onInputChange(query){
    this.setState({query})
    if(!query){
    this.setState({suggestKeywords: keyWords})
    return
  }
  const match = new RegExp(escapeRegExp(this.state.query), 'i')
  const filteredAllowWords = this.state.suggestKeywords.filter((word) => match.test(word))
  this.setState({suggestKeywords: filteredAllowWords})
    // const match = new RegExp(escapeRegExp(query), 'i')
    // const filteredBooks = this.state.searchResults.filter((book) => match.test(book.title))
    // this.setState({filteredBooks: filteredBooks})
    // console.log(this.state.filteredBooks)
    // if(!query){
    //   this.setState({filteredBooks: this.state.searchResults})
    //   return
    // }
  }
  handleSubmit(event) {
    event.preventDefault()
    BooksAPI.search(this.state.query, 20)
    .then(result => {
      // If BooksApi returns anything other than array throw error and skip state updates
      if(!Array.isArray(result)) {
        throw new Error('Bad response')
      }
      return result
    })
    .then(result =>
      result.map(newBook => {
        if(this.state.books.filter(book => book.id === newBook.id).length) {
          var filteredBook = this.state.books.filter(book => book.id === newBook.id)// Pull out the book already in one of the shelves. Result is an one item array.
          newBook.shelf = filteredBook[0].shelf; // Assign shelf property to the newBook which is currently 'none' or a hard-coded shelf property.
        } else if(newBook.shelf !== 'none') {  // If the shelf property is hard-coded by the Audacity folks, reset it to 'none' ;-)
          newBook.shelf = 'none'
        }
        return newBook
      }))
    .then(result => {
      this.setState({searchResults: result})  // Add books to searchResults book array
    })
    .catch(e => {
      this.setState({error: 'Failed to load resources'})
    })
  }

  renderSearchResults(){
        if(this.state.searchResults.length < 1 && this.state.query===''){
          return(
            <div className="search-books">
              <div style={{margin: '70px'}}>
                <h2>Suggest Keywords</h2>
                <p>Type a keyword then press ENTER to search or click on a keyword below to find your book!</p>
                <hr />
                <div className="tags">
                  <ul>
                    {this.state.suggestKeywords.map((word, i)=>{
                     return (
                        <li key={i}><a onClick={()=>''}>{word}</a></li>
                     )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )
        }
        return(
            this.state.searchResults.map((book, i) => {
             return(<Book key={book.id + i}
             book={book} addToMyBooks={(bookId)=>this.addToMyBooks(bookId)} updateBooksFromSearch={(bookId, shelf)=>this.onShelfSelect(bookId, shelf)} />
           )
         })
      )
  }
  render() {
      return(
             <div className="search-books">
                  <div className="search-books-bar">
                    <div style={{margin: "14px"}}><Link to="/" className="to-home" >Home</Link></div>
                     <div className="close-search" onClick={()=> createHistory().go(-1)}>Close</div>
                      <div className="search-books-input-wrapper">
                        <form onSubmit={this.handleSubmit}>
                          <input
                            ref={(input) => { this.nameInput = input; }}
                            className="search-books"
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.onInputChange(event.target.value)}
                          />
                        </form>
                      </div>
                  </div>
               <div style={{marginTop: "80px"}}>
                 <ol className="books-grid">
                   {this.renderSearchResults()}
                 </ol>
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
