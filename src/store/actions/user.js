import * as actionTypes from './actionTypes';
//Action Creators below

export const signIn = (userDetails) => {;
    return {
        type: actionTypes.SIGNIN,
        userDetails: userDetails
    }
}

export const signUp = (email, password) => {
    return {
        type: actionTypes.SIGNUP,
        email: email,
        password: password
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const toggleLoading = () => {
    return {
        type: actionTypes.TOGGLE_LOADING
    }
}

export const saveNotes = (notes) => {
console.log('notes',notes);
    return {
        type: actionTypes.SAVE_NOTES,
        notes: notes
    }
}

/*
export const initUser = (accessToken, organisationUUID, userUUID, api) => {
    return( dispatch, getState) => {
        api.getProfile(accessToken, organisationUUID, userUUID)
        .then(res => {
            if(!res.error) {
                dispatch(setError(false, ''));
                dispatch(setUser(res.data));
            }
        })
        .catch(err => dispatch(setError(true, err.message)));
    }
 }
 */