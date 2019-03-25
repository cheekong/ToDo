import * as actionTypes from './actionTypes';
import * as api from '../../utilities/api';
//Action Creators below

const signIn = (fistname, lastname, notes) => {
    return {
        type: actionTypes.SIGNIN,
        notes: notes,
        firstname: fistname,
        lastname: lastname
    }
}

export const login = (email, password) => {
    return( dispatch, getState) => {
        api.getAccount(email, password)
        .then(res => {
            const key = Object.keys(res);
console.log('res[key],',res[key])
            dispatch(signIn(res[key]));
        })
        .catch(err => {
            console.log('login  err',err)
        });
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