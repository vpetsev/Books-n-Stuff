import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actionTypes from "../store/actions/actionTypes";
import UpdateBook from "../components/UpdateBook"


function BooksList(props) {

    useEffect(() => {
        fetch("http://localhost:8008/api/books")
            .then(res => res.json())
            .then(result => {
                props.onBooksLoaded(result)
            })
    }, [])

    const handleRemoveBook = (book) => {
        fetch(`http://localhost:8008/delete-book/${book.id}`, {
            method: "POST",
            headers: {
                "Content-type":"application/json",
            },
            body: JSON.stringify({id: book.id})
        })
    }
    

    const bookItems = props.loadedBooks.map(book => {
        return <li className="book">
            <h3>{book.title}</h3>
            <h5>{book.publisher}</h5>
            <img src={book.imageURL} />
            <p>{book.year}</p>
            <p>{book.genre}</p>
            <button onClick={() => handleRemoveBook(book)}>Remove</button>
            <br />
            <UpdateBook book={book}/>
        </li>
    })

    return (
        <div>
            <h2>Books</h2>
            <ul>
                {bookItems}
            </ul>
        </div>
    )
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBooksLoaded: (books) => dispatch({type: actionTypes.LOADED_BOOKS, payload: books})
    }
}

const mapStateToProps = (state) => {
    console.log(state.loadedBooks)
    return {
        loadedBooks: state.loadedBooks
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BooksList);