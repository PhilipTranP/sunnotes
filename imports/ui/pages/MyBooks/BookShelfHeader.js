import React, { Component } from 'react'
import './BookShelfHeader.css'


export default class BookShelfHeader extends Component {
  constructor(props){
    super(props)
      this.state={
        query: ''
      }
  }
  onInputChange(query){
    this.setState({query})
    this.props.filterBookInShelf(query, this.props.title)
  }
  render() {
    const screen = window.innerWidth
    //Make the title shorter on mobile so that there is room for the search input
    const displayCorrectTitle = (index) => {
      if (index === 0){
        return (screen > 460 ? "Currrently Reading" : "Reading")
      } else if (index === 1){
        return (screen > 460 ? "Want to Read" : "Want to")
      } else {
        return("Read")
      }
    }
    return(
      <div className="bookshelf-title-container">
        <h2 className="bookshelf-title-text">{displayCorrectTitle(this.props.title)}
          <span className="expand-search-input-wrapper"  style={{display: "inline-block", marginLeft: "10px"}}>
              <input
                type="search"
                placeholder="search"
                value={this.state.query}
                onChange={(event) => this.onInputChange(event.target.value)}
              />
           </span>
         </h2>
      </div>
    )
  }
}
