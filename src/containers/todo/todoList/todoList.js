import React, { Component } from 'react';
import { connect } from 'react-redux'

import Form from '../../../components/UI/Form/Form';
import NoteList from '../../../components/Note/NoteList/NoteList';
import SpinnerIcon from '../../../components/UI/SpinnerIcon/SpinnerIcon';
import * as actionCreators from '../../../store/actions/index';
import * as api from '../../../utilities/api';

class TodoList extends Component {
    state = {
       notes: null,
       loading: true,
       message: '',
       action: ''
    }

    handleViewNote = (noteId) => {
        this.props.history.push({
            pathname: '/note',
            search: '?query=abc',
            state: {noteId: noteId}
        })
    }

    handleDeleteNote = (event, noteId, isLogin=this.props.isLogin, userId=this.props.userId) => {
        event.preventDefault();
        this.props.toggleLoading();
        this.props.deleteNote(noteId, isLogin, userId);
        this.setState({
            action: 'delete'
        });
    }

    getNotes(userId){
        if(this.props.isLogin){
            api.getNotes(userId)
            .then(res => {
                this.setState({
                    notes: res,
                    loading: false
                })
            }) 
            .catch(err => {
                console.log('err',err);
            });
        } else {
            this.setState({
                notes: this.props.notes
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(!this.props.loading && 
            prevProps.loading && 
            this.state.action === 'delete'
        ){
            this.getNotes(this.props.userId);
            this.setState({
                action: ''
            });
        }
    }

    componentDidMount() {
        this.getNotes(this.props.userId);
    }

    render(){
        let content = (<SpinnerIcon />);
        if(!this.state.loading && this.state.notes){
            content = <NoteList 
                data={this.state.notes} 
                handleView={this.handleViewNote.bind(this.props.isLogin)} 
                handleDelete={this.handleDeleteNote}
                isLogin={this.props.isLogin}
            />
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
      isLogin: state.user.login,
      loading: state.user.loading,
      userId: state.user.info.userId
    }
  }

const mapDispatchToProps = dispatch => ({
    saveNotes: (notes) => dispatch(actionCreators.updateNote(notes)),
    deleteNote: (noteId, isLogin, userId) => dispatch(
        actionCreators.deleteNote(
            noteId, 
            isLogin, 
            userId
        )
    ),
    toggleLoading: () => dispatch(actionCreators.toggleLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)