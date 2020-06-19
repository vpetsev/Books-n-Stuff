import React, { useState } from "react"

function AddBook(props) {

    const [newBook, setNewBook] = useState({})

    const handleTextBoxChange = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value
        })
    }

    const handleNewBook = () => {
        fetch("http://localhost:8008/add-book", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newBook)
        })
    }

    return (
        <div>
            <input type="text" placeholder="title" name="title" onChange={handleTextBoxChange} />
            <input type="text" placeholder="genre" name="genre" onChange={handleTextBoxChange} />
            <input type="text" placeholder="author" name="author" onChange={handleTextBoxChange} />
            <input type="text" placeholder="year" name="year" onChange={handleTextBoxChange} />
            <input type="text" placeholder="imageURL" name="imageURL" onChange={handleTextBoxChange} />
            <button onClick={() => handleNewBook(newBook)}>Add Book</button>
        </div>
    )
}

export default AddBook;