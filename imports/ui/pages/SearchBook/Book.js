import React, { Component } from 'react'
import './SearchBook.css'

export default class Book extends Component {
  state = {
    option: ''
  }
  onSelect(id, option){
    // this.props.updateBooksInShelf(id, option)
    this.props.addToMyBooks(id)
    this.setState({option: "none"}) //this resets the select options
  }
  render(){
    if(this.props.book) {
    const { book } = this.props
    return(
        <li key={book.id}>
         <div className="book">
           <div className="book-top">
             <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
             <div className="book-shelf-changer">
               <select defaultValue={ book.shelf ? book.shelf : null } onChange={ (event) => { this.onSelect({id: book.id}, event.target.value)} }>
                 <option value="none" disabled>Move to...</option>
                 <option value="currentlyReading">Currently Reading</option>
                 <option value="wantToRead">Want to Read</option>
                 <option value="read">Read</option>
                 {/*this.props.query
                   ?
                     <option value="none">Remove from shelf</option>

                   : null
                 */}
               </select>
             </div>
           </div>
           <div className="book-title">{book.title}</div>
           <div className="book-authors">
             { book.authors && book.authors.length
                ?
                   book.authors.map((author, index) => {
                     return (
                       <span key={ index }>{ author }<br /></span>
                     )
                   })
                 : null
              }
           </div>
         </div>
       </li>
     )}
    }
  }
