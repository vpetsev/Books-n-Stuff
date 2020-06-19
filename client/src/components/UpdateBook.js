import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/actionTypes";
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl"

function UpdateBook(book) {
    const [show, setShow] = useState(false)
    const [updatedBook, setUpdatedBook] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    const handleTextBoxChange = (e) => {
        setUpdatedBook({
            ...updatedBook,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = () => {
        fetch("http://localhost:8008/update-post", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({book: book})
        })
    }

    let bookInfo = book.book
    console.log(bookInfo)
    
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
                        <p>Title</p>
                        <FormControl placeholder={bookInfo.title} value={bookInfo.title} name="title" onChange={handleTextBoxChange} />
                        <FormControl placeholder={bookInfo.genre} value={bookInfo.genre} name="genre" onChange={handleTextBoxChange} />
                        <FormControl placeholder={bookInfo.publisher} value={bookInfo.publisher} name="author" onChange={handleTextBoxChange} />
                        <FormControl placeholder={bookInfo.year} value={bookInfo.year} name="year" onChange={handleTextBoxChange} />
                        <FormControl placeholder="Image Link" value={ bookInfo.imageURL} name="imageURL" onChange={handleTextBoxChange} />
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


export default connect()(UpdateBook);