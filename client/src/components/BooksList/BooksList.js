import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/creators/actionCreators";
import UpdateBook from "../UpdateBook/UpdateBook"
import "./BooksList.css";


function BooksList(props) {

    useEffect(() => {
        console.log("useEffectFired")
        props.onLoadBooks()
    }, [])

    const handleRemoveBook = (book) => {
        console.log(book)
        try {
            fetch(`http://localhost:8008/delete-book/${book.id}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id: book.id })
            }).then(() => {
                props.onLoadBooks()
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    const bookItems = props.loadedBooks.map(book => {
        return (
        <div key={book.id} className="book">
            <div className="image-container">
                <img src={book.imageURL} alt={book.title} />
            </div>
            <h2>{book.title}</h2>
            <div className="book-container">
                <div className="book-information">
                    <p>{book.publisher}</p>
                    <p>{book.year}</p>
                    <p>{book.genre}</p>
                </div>
                <div className="book-formgroup">
                    <button onClick={() => handleRemoveBook(book)}>Delete</button>
                </div>
            </div>
            <UpdateBook book={book} />    
        </div>
        )
    })

    return (
        <div>
            <h2>Books</h2>
            <div className="book-container">
                {bookItems}
            </div>
        </div>
    )
    
}

        // <li className="book">
        //         <h3>{book.title}</h3>
        //         <h5>{book.publisher}</h5>
        //         <img src={book.imageURL} />
        //         <p>{book.year}</p>
        //         <p>{book.genre}</p>
        //         <button onClick={() => handleRemoveBook(book)}>Remove</button>
        //         <br />
        //         <UpdateBook book={book}/>
        // </li>
        
const mapDispatchToProps = (dispatch) => {
    return {
        onLoadBooks: (books) => dispatch(actionCreators.loadBooks(books))
    }
}

const mapStateToProps = (state) => {
    console.log(state.loadedBooks)
    return {
        loadedBooks: state.loadedBooks
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BooksList);