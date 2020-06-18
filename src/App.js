import React, { useEffect, useState } from 'react';
import './App.css';
import { connect } from "react-redux"
import * as actionCreators from "./store/creators/actionCreators"

function App(props) {

  const [books, setBooks] = useState([])

  useEffect(() => {

    fetch("http://localhost:8008/api/books")
      .then(response => response.json())
      .then(result => {
        let books = result
        setBooks(books)
      })

  }, [])

  

  const bookItems = props.books.map(book => {
    return <li>
              <h1>{book.title}</h1>
              <h2>{book.author}</h2>
              <h3>{book.genre}</h3>
              <h3>{book.year}</h3>
              <img src={book.imageURL} />
           </li>
  })

  return (
    <ul>hello.</ul>
  );
}
const mapStateToProps = (state) => {

  return {
    books: state.books
  }
}

const mapDispatchToProps = (dispatch) => {
  onBooksLoaded = (books) => dispatch(actionCreators.booksLoaded(books))
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
