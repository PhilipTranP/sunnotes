import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import _ from 'lodash'
// import escapeRegExp from 'escape-string-regexp'
import createHistory from 'history/createBrowserHistory'
import MyBooks from '../../../api/MyBooks/myBooks'
import validate from '../../../modules/validate'
import { Link } from 'react-router-dom'
import Book from './Book'
import './SearchBook.css'

export default class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state={
      option: '',
      query: '',
      books: [],
      error:'',
      updatedBooks: [],
      searchResults: [],
      filteredBooks: [],
      myBook: {}
    }
  }
  componentDidMount() {
    this.nameInput.focus() // TODO: show placeholder when not in focus mode.
    BooksAPI.search('javascript')
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

  addToMyBooks(bookId) {
    const myBook = _.find(this.state.books, {id: bookId.id})

    // this.setState({ myBook })
    console.log(myBook)
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
      console.log(bookData.title)
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
    // const match = new RegExp(escapeRegExp(query), 'i')
    // const filteredBooks = this.state.searchResults.filter((book) => match.test(book.title))
    // this.setState({filteredBooks: filteredBooks})
    // console.log(this.state.filteredBooks)
    // if(!query){
    //   this.setState({filteredBooks: this.state.searchResults})
    //   return
    // }
  }
  // handleSubmit(event, query) {
  //   const history = createHistory()
  //   history.push({
  //   pathname: `/search/${this.state.query}`,
  //   })
  //   window.location.reload()
  // }
  // searchBook(query) {
  //   var term = query.trim()
  //   this.setState({query: term})
  //   if(!term) {
  //     this.setState({searchResults: []})
  //     return
  //   }
  //   this.props.query && BooksAPI.search(this.state.query)
  //   .then(result => {
  //     // If BooksApi returns anything other than array throw error and skip state updates
  //     if(!Array.isArray(result)) {
  //       throw new Error('Bad response')
  //     }
  //     return result
  //   })
  //   .then(result =>
  //     result.map(newBook => {
  //       if(this.props.books.filter(book => book.id === newBook.id).length) {
  //         var filteredBook = this.props.books.filter(book => book.id === newBook.id)// Pull out the book already in one of the shelves. Result is an one item array.
  //         newBook.shelf = filteredBook[0].shelf; // Assign shelf property to the newBook which is currently 'none' or a hard-coded shelf property.
  //       } else if(newBook.shelf !== 'none') {  // If the shelf property is hard-coded by the Audacity folks, reset it to 'none' ;-)
  //         newBook.shelf = 'none'
  //       }
  //       return newBook
  //     }))
  //   .then(result => {
  //     this.setState({searchResults: result})  // Add books to searchResults book array
  //   })
  //   .catch(e => {
  //     this.setState({error: 'Failed to load resources'})
  //   })
  // }

  renderSearchResults(){
    if(this.state.books.length > 0 ){
      return(
        this.state.books.map((book) => {
             return(<Book key={book.id}
             book={book} addToMyBooks={(bookId)=>this.addToMyBooks(bookId)}/>
           )
         })
      )
    } else {
      return (
        <div style={{margin: "100px"}}>
          <h1 style={{fontWeight: "300"}}> No books found <span><a href="http://localhost:3000/search"> Suggest Keywords</a></span></h1>
        </div>
      )
    }
  }
  render() {
      return(
             <div className="search-books">
                  <div className="search-books-bar">
                    <div style={{margin: "14px"}}><Link to="/" className="to-home" >Home</Link></div>
                     <div className="close-search" onClick={()=> createHistory().go(-1)}>Close</div>
                      <div className="search-books-input-wrapper">
                        <form onSubmit={(event, query) => this.handleSubmit(event, event.target.value)}>
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
}
