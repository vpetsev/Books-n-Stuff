
import * as actionTypes from '../store/actions/actionTypes'

const initialState = {
    books: []
}

let reducer = (state = initialState, action) => {

    if (action.type === actionTypes.ALL_BOOKS) {
        return {
            ...state,
            books: action.payload
        }
    }

    return state
}

export default reducer;