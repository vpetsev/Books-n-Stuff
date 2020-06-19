import React, { useState, useEffect } from "react";
import * as actionTypes from "../../store/actions/actionTypes";
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl"
import "./UpdateBook.css"

function UpdateBook(props) {
    const [show, setShow] = useState(false)
    const [updatedBook, setUpdatedBook] = useState({})
    const [book, setBook] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const handleTextBoxChange = (e) => {
        
        setUpdatedBook({
            ...updatedBook,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = () => {
        fetch("http://localhost:8008/update-book", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedBook)
        }).then(() => {
            handleClose()
        })
    }

    useEffect(() => {
        setUpdatedBook(props.book)
        setBook(props.books)
    }, [])

    // let bookInfo = props.book
    
    return (
        <>
            <Button variant="primary" onClick={handleShow} >
                Is this information incorrect?
            </Button>

            <Modal show={show} onHide={handleClose} className="myModal">
                <Modal.Header closeButton>
                    <Modal.Title>Update Book Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        {/* <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-default">Default</InputGroup.Text>
                        </InputGroup.Prepend> */}
                        <h3>{updatedBook.title}</h3>
                        <FormControl placeholder={updatedBook.title} value={updatedBook.title} name="title" onChange={handleTextBoxChange} />
                        <FormControl placeholder={updatedBook.genre} value={updatedBook.genre} name="genre" onChange={handleTextBoxChange} />
                        <FormControl placeholder={updatedBook.publisher} value={updatedBook.publisher} name="author" onChange={handleTextBoxChange} />
                        <FormControl placeholder={updatedBook.year} value={updatedBook.year} name="year" onChange={handleTextBoxChange} />
                        <FormControl placeholder="Image Link" value={ updatedBook.imageURL} name="imageURL" onChange={handleTextBoxChange} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default UpdateBook;