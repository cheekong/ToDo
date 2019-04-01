import axios from 'axios';

let axiosInstance = null;//axios.create({baseURL: baseURL});

const BASE_URL = 'https://notetaking-fce6f.firebaseio.com/users/';

export const submitNote = (note, userId) => new Promise((resolve, reject) => {
console.log('userid', userId)
    axios.post(
        BASE_URL + userId + '/notes.json',
        {
            note: note
        }
    )
    .then(res => {
        resolve(res);
    })
    .catch(err => {
        reject(err);
    });
});

export const getNotes = (userId) => new Promise((resolve, reject) => {
    axios.get(
        BASE_URL + userId + '/notes.json'
    )
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    });
});

export const getNote = (userId, noteId) => new Promise((resolve, reject) => {
    axios.get(
        BASE_URL + userId + '/notes/' + noteId + '.json'
        )
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

export const deleteNote = (id) => new Promise((resolve, reject) => {
    axios.delete(
        'https://notetaking-fce6f.firebaseio.com/note/' + id + '.json'
    )
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

export const createAccount = (email, password) => new Promise((resolve, reject) => {
    axios.post(
        'https://notetaking-fce6f.firebaseio.com/users.json',
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
    axios.get(
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
    axios.get(
        'https://notetaking-fce6f.firebaseio.com/users.json'
    )
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})