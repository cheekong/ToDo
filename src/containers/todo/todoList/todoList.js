import React, { Component } from 'react';
import { connect } from 'react-redux'

import Form from '../../../components/form/form';
import * as actionCreators from '../../../store/actions/index';
import * as api from '../../../utilities/api';
import './todoList.css';

class TodoList extends Component {
    state = {
       notes: null,
       loading: true,
       message: ''
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
console.log('notes', this.state.notes);
        let noteKeys = Object.keys(this.state.notes);
        let notes = [];
        for(let key of noteKeys){

            let noteItem = this.state.notes[key].note;
console.log('noteItem',noteItem);
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

    getNotes(userId){
        if(this.props.login){
            api.getNotes(userId)
            .then(res => {
                console.log('res',res);
                this.setState({
                    notes: res,
                    loading: false
                })
            }) 
            .catch(err => {
                console.log('err',err);
            });
        } else {
            console.log(this.props.notes);
            this.setState({
                notes: this.props.notes
            })
        }
    }

    componentDidUpdate(prevProps, prevState){

    }

    componentDidMount() {
        this.getNotes(this.props.userId);
    }

    render(){
        let content = <div><i class="fas fa-spinner fa-spin"/></div>;
        if(!this.state.loading && this.state.notes){
            content = this.buildNotes();
        } else if(!this.state.loading && this.state.notes === null) {
            content = (<h1>You have no notes! :(</h1>);
        }

        
        return(
            <Form>
                {content}
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
      notes: state.user.notes,
      login: state.user.login,
      loading: state.user.loading,
      userId: state.user.info.userId
    }
  }

const mapDispatchToProps = dispatch => ({
    saveNotes: (notes) => dispatch(actionCreators.saveNotes(notes)),
    toggleLoading: () => dispatch(actionCreators.toggleLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)