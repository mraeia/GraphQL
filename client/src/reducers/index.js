import { combineReducers } from 'redux';

// const initialState = {
//     isAuthenticated: false,
//     user: null
// }

const setCurrentUserReducer = (state = null,action) => {
    if (action.type === 'SET_CURRENT_USER'){
        return action.payload;
    }
    return state;
}

export default combineReducers({
    currentUser: setCurrentUserReducer
});