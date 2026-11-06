import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { connect } from "react-redux";

export function FilterBooks({ loadedBooks, genre, onFilter }) {
    const categories = [...new Set(loadedBooks.map(book => book.genre).filter(Boolean))];
    return (
        <div className="filterDropDown">
            <DropdownButton id="dropdown-basic-button" title={genre || "Filter"}>
                <Dropdown.Item onClick={() => onFilter("")}>All genres</Dropdown.Item>
                {categories.map(category => (
                    <Dropdown.Item key={category} onClick={() => onFilter(category)}>
                        {category}
                    </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    );
}

export default connect(state => ({ loadedBooks: state.loadedBooks }))(FilterBooks);
