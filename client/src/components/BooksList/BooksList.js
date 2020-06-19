import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actionCreators";
import UpdateBook from "../UpdateBook/UpdateBook"
import "./BooksList.css";


function BooksList(props) {

    useEffect(() => {
        bookFetcher()
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
    
    // <DropdownButton id="dropdown-basic-button" title="Dropdown button">
    //     <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //     <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //     <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    // </DropdownButton>

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
                    <button>button1</button>
                    <button>button2</button>
                    <button>button3</button>
                    <UpdateBook book={book} />    
                </div>
            </div>
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
        onBooksLoaded: (books) => dispatch(actionCreators.loadBooks)
    }
}

const mapStateToProps = (state) => {
    console.log(state.loadedBooks)
    return {
        loadedBooks: state.loadedBooks
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(BooksList);