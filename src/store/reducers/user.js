import * as actionTypes from '../actions/actionTypes';

const initialState = {
    info: {
        firstname: null,
        surname: null
    },
    notes: [],
    login: false,
    loading: false,
    error: false,
    errorMessage: ''
}

const signIn = (state, action) => {
    return {
        ...state,
        loaded: true,
        userDetails: {...action.userDetails}
    };
}

const signUp = (state, action) => {
    return {
        ...state,
        loaded: true,
        userDetails: {...action.userDetails}
    };
}

const logout = (state, action) => {
    return {
        ...state,
        loaded: true,
        userDetails: {...action.userDetails}
    };
}

const saveNotes = (state, action) => {
console.log('action',action);
    let newStateNotes = JSON.parse(JSON.stringify(state.notes));
    newStateNotes.push(action.notes);
console.log('newStateNotes',newStateNotes);
    return {
        ...state,
        notes: newStateNotes,
        loading: false
    }
}

const toggleLoading = (state, action) => {
    return {
        ...state,
        loading: !state.loading
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGNIN: return signIn(state, action);
        case actionTypes.SIGNUP: return signUp(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        case actionTypes.SAVE_NOTES: return saveNotes(state, action);
        case actionTypes.TOGGLE_LOADING: return toggleLoading(state, action);
        default: return state;
    }
}

export default reducer;