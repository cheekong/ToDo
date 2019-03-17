import React, { Component } from 'react';

import * as api from '../../../utilities/api';

import './todoList.css';

class TodoList extends Component {
    state = {
       notes: null
    }

    
    handleViewNote(noteID){
        this.props.history.push({
            pathname: '/note',
            search: '?query=abc',
            state: {noteID: noteID}
        })
    }

    handleDeleteNote(noteID){
        api.deleteNote(noteID)
        .then(res => {
            console.log('del res',res)
            this.getNotes();
        })
        .catch( err => {
            console.log('del err',err)
        })
    }

    buildNotes(){

        let noteKeys = Object.keys(this.state.notes);
        let notes = [];
        for(let key of noteKeys){

            let noteItem = this.state.notes[key].note;
            let completeCount = 0;
            if(noteItem.items.completed){
                completeCount = noteItem.items.completed.length;
            }

            let pendingCount = 0;
            if(noteItem.items.pending){
                pendingCount = noteItem.items.pending.length;
            }
            notes.push(
                <div className='note-items' key={key}>
                    <h3>{this.state.notes[key].note.title}</h3>
                    <section className=''>
                        <ul>
                            
                            <li>Tasks Completed: {completeCount}</li>
                            <li>Tasks Pending: {pendingCount}</li>
                        </ul>
                        <section className='todo-list-actions'>
                            <i  className="far fa-edit todo-list-actions__button todo-list-actions__button--edit" 
                                onClick={() => this.handleViewNote(key)}/>
                            <i  className="far fa-trash-alt todo-list-actions__button todo-list-actions__button--delete" 
                                onClick={() => this.handleDeleteNote(key)}/>
                        </section>
                    </section>
                </div>
            )
        }

        return (
            <section id='notes-lists'>
                {notes}
            </section>
        )
    }

    getNotes(){
        api.getNotes()
        .then(res => {
            console.log('res',res);
            this.setState({
                notes: res
            })
        }) 
        .catch(err => {
            console.log('err',err);
        })
    }

    componentDidUpdate(prevProps, prevState){

    }

    componentDidMount() {
        this.getNotes();
    }

    render(){
        let notes = null;
        if(this.state.notes){
            notes = this.buildNotes();
        }

        return(
          <div>
            {notes}
          </div>
        )
    }
}

export default TodoList;