import * as actionTypes from './actionTypes';
import * as api from '../../utilities/api';
//Action Creators below

const signIn = (fistname, lastname, userId) => {
    return {
        type: actionTypes.SIGNIN,
        firstname: fistname,
        lastname: lastname,
        userId: userId        
    }
}

export const login = (email, password) => {
    return( dispatch, getState) => {
        api.getAccount(email, password)
        .then(res => {
console.log('login res',res)
            const key = Object.keys(res);
            const body = res[key[0]];
console.log('res[key],',res[key[0]]);
console.log('key', key[0]);
            dispatch(signIn(email, password, key[0]));
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

export const setStatusAndLoading = (status, isLoading) => {
    return {
        type: actionTypes.SET_STATUS_LOADING,
        status: status,
        isLoading: isLoading
    }
}

const saveNotesToStore = (notes) => {
console.log('notes',notes);
    return {
        type: actionTypes.SAVE_NOTES,
        notes: notes
    }
}

const saveNotesToLocalStorage = (notes) => {
    let existingNotes = JSON.parse(localStorage.getItem('notes', notes));
    let jsonNotes = null;
    if(existingNotes){
        jsonNotes = JSON.stringify([...existingNotes, notes]);
        localStorage.setItem('notes', jsonNotes);
    } else {
        jsonNotes = JSON.stringify(notes);
        localStorage.setItem('notes', jsonNotes);
    }
    
}

const saveNotesToDatabase = (notes, userId) => {
    api.submitNote(notes, userId)
    .then(res => {
        if(res.status === 200){
console.log('res',res);
        }
    })
    .catch(err => {
        alert('error when submit');
    });
}

export const saveNotes = (notes, isLogin, userId) => {
    console.log('notes',notes, 'islogin', isLogin);
    return( dispatch, getState) => {
        if(isLogin){
            saveNotesToDatabase(notes, userId);
        } else {
            //saveNotesToLocalStorage(notes);
            dispatch(saveNotesToStore(notes));
        }
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