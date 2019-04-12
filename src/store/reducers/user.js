import * as actionTypes from '../actions/actionTypes';

const initialState = {
    info: {
        firstname: null,
        surname: null,
        userId: ''
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
        info: {
            fistname: action.firstname,
            lastname: action.lastname,
            userId: action.userId
        },
        login: true,
        loading: false
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
        ...initialState
    };
}

const saveNotes = (state, action) => {
    let existingNotes = JSON.parse(localStorage.getItem('notes'));
    let jsonNotes = null;
    if(existingNotes){
        jsonNotes = JSON.stringify([...existingNotes, action.notes]);
        localStorage.setItem('notes', jsonNotes);
    } else {
        jsonNotes = JSON.stringify(action.notes);
        localStorage.setItem('notes', jsonNotes);
    }

    let newStateNotes = [JSON.parse(JSON.stringify(action.notes))];
    newStateNotes.push(action.notes);
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

const setStatusAndLoading = (state, action) => {
    return {
        ...state,
        loading: action.loading,
        status: action.status
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SIGNIN: return signIn(state, action);
        case actionTypes.SIGNUP: return signUp(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        case actionTypes.SAVE_NOTES: return saveNotes(state, action);
        case actionTypes.TOGGLE_LOADING: return toggleLoading(state, action);
        case actionTypes.SET_STATUS_LOADING: return setStatusAndLoading(state, action);
        default: return state;
    }
}

export default reducer;