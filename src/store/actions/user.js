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
            const key = Object.keys(res);
            const body = res[key[0]];
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

export const toggleLoading = (test) => {
console.log('actions toggleLoading', test);
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

const saveNoteToDatabase = (notes, userId) => {
    return (dispatch, getState) => {
        api.submitNote(notes, userId)
        .then(res => {
    console.log('saveNotesToDatabase api.submitNote res',res)
            dispatch(toggleLoading('test'));
        })
        .catch(err => {
            console.error('error when submit');
            console.error('err', err);
        });
    }
}

const updateNoteToDatabase = (note, userId, noteId) => {
    return (dispatch, getState) => {
        api.updateNote(note, userId, noteId)
        .then(res => {
    console.log('updateNoteToDatabase res',res)
            dispatch(toggleLoading('test'));
        })
        .catch(err => {
            console.error('error when submit');
            console.error('updateNoteToDatabase err', err);
        });
    }
}

export const saveNewNote = (notes, isLogin, userId) => {
    return( dispatch, getState) => {
        if(isLogin){
            dispatch(saveNoteToDatabase(notes, userId));
        } else {
            //saveNotesToLocalStorage(notes);
            dispatch(saveNotesToStore(notes));
        }
    }
}

export const updateNote = (note, isLogin, userId, noteId) => {
    console.log('updateNote note', note)
    console.log('updateNote isLogin', isLogin)
    console.log('updateNote userId', userId)
console.log('updateNote noteId', noteId)
    return( dispatch, getState) => {
        if(isLogin){
            dispatch(updateNoteToDatabase(note, userId, noteId));
        } else {
            //saveNotesToLocalStorage(notes);
            dispatch(saveNotesToStore(note));
        }
    }
}

//TODO:
export const deleteNote = (noteId, isLogin, userId) => {
    alert('actions saveNotes');
        return( dispatch, getState) => {
            if(isLogin){
                dispatch(saveNoteToDatabase(noteId, userId));
            } else {
                //saveNotesToLocalStorage(notes);
                dispatch(saveNotesToStore(noteId));
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