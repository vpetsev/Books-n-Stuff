import React from "react";
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from "react-bootstrap/DropdownButton";
import { connect } from "react-redux";

function FilterBooks(props) {

    const onFilter = (genre) => {
        console.log(genre)
    }

    const bookCategories = props.loadedBooks.map(book => {
        let genre = book.genre
        return (
            <Dropdown.Item onClick={onFilter(genre)}>{book.genre}</Dropdown.Item>
        )
    })
    return (
        <div className="filterDropDown">
            <DropdownButton id="dropdown-basic-button" title="Filter">
                {bookCategories}

            </DropdownButton>
        </div>
    )
}   

const mapStateToProps = (state) => {
    return {
        loadedBooks: state.loadedBooks
    }
}

export default connect(mapStateToProps)(FilterBooks);