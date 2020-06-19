import * as actionTypes from "../store/actions/actionTypes";

export const loadBooks = () => {

    return (dispatch) => {
        fetch("http://localhost:8008/api/books")
            .then(res => res.json())
            .then(result => {
                dispatch({ type: actionTypes.LOADED_BOOKS, payload: result })
            })
        
    }

}