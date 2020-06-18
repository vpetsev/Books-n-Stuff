import * as actionTypes from "../actions/actionTypes"

export const booksLoaded = (books) => {
    return {
        type: actionTypes.ALL_BOOKS,
        payload: books
    }
}