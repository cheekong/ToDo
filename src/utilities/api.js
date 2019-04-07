import axios from 'axios';

const BASE_URL = 'https://notetaking-fce6f.firebaseio.com/users/';
const axiosInstance = axios.create({baseURL: BASE_URL});



export const submitNote = (notes, userId) => new Promise((resolve, reject) => {
console.log('submitNote notes', notes)
    axiosInstance.post(
        userId + '/notes.json',
        notes
    )
    .then(res => {
console.log('submit note then res', res);
        resolve(res);
    })
    .catch(err => {
console.log('submit note then err', err);
        reject(err);
    });
});



//WIP
export const updateNote = (notes, userId, noteId) => new Promise((resolve, reject) => {
    console.log('updateNote called', userId, 'noteId', noteId);
        axiosInstance.put(
            userId + '/notes/' + noteId + '.json',
            notes
        )
        .then(res => {
    console.log('updateNote note then res', res);
            resolve(res);
        })
        .catch(err => {
    console.log('updateNote note then err', err);
            reject(err);
        });
    });

export const getNotes = (userId) => new Promise((resolve, reject) => {
    axiosInstance.get(
        userId + '/notes.json'
    )
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    });
});

export const getNote = (userId, noteId) => new Promise((resolve, reject) => {
console.log('getNote call()', userId, noteId);
    axiosInstance.get(
        userId + '/notes/' + noteId + '.json'
        )
    .then(res => {
console.log('getNote res', res)
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

export const deleteNote = (userId, noteId) => new Promise((resolve, reject) => {
    axiosInstance.delete(
        userId + '/notes/' + noteId + '.json'
    )
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

export const createAccount = (email, password) => new Promise((resolve, reject) => {
    axiosInstance.post(
        //'https://notetaking-fce6f.firebaseio.com/users.json',
        {
            email: email,
            password: password
        }
    )
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

export const checkExists = (email) => new Promise((resolve, reject) => {
    axiosInstance.get(
        'https://notetaking-fce6f.firebaseio.com/users.json?shallow=true&orderBy="email"&startAt="' + email + '"',
    )
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

export const getAccount = (email, password) => new Promise((resolve, reject) => {
    axiosInstance.get(
        '.json'
    )
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})