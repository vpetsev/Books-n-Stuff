import * as actionTypes from "../actions/actionTypes";

export const loadBooks = () => {

    return (dispatch) => {

        fetch("http://localhost:8008/api/books")
            .then(res => res.json())
            .then(json => {
                dispatch({ type: actionTypes.LOADED_BOOKS, payload: json})
            })
        
    }

}