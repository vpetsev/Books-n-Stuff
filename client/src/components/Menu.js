import React from "react";
import { NavLink } from "react-router-dom"


export function Menu() {
    return (
        <ul className="menu">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/books">All Books</NavLink></li>
            <li><NavLink to="/add-book">Add New Books</NavLink></li>
            <li><NavLink to="/update-book">Update a Book</NavLink></li>
        </ul>
    )
}