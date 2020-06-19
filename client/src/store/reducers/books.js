import * as actionTypes from "../actions/actionTypes"

let initialState = {
    loadedBooks: []
}

let reducer = (state = initialState, action) => {

    if (action.type === actionTypes.LOADED_BOOKS) {
        return {
            loadedBooks: action.payload
        }
    } else if (action.type === actionTypes.NEW_BOOK) {
        return {
            newBook: action.payload
        }
    }
    
    return state
}

export default reducer;