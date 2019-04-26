import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import NoteContainer from '../../components/Note/NoteContainer/NoteContainer';
import SpinnerIcon from '../../components/UI/SpinnerIcon/SpinnerIcon';
import * as actionCreators from '../../store/actions/index';
import * as api from '../../utilities/api';
//import './todo.css';

class Todo extends Component {
    state = {
        // items consist of numeric increment as ID, checked status and description
        note: {
            items: {
                pending: [
                    {
                        id: 0,
                        checked: false,
                        description: ''
                    }
                ],
                completed: []
            },
            title: ''
        },    
        textInput: React.createRef(),
        titleChange: true,
        loading: true,
        form: null,
        noteId: null,
        action: '',
        inputMaxLength: 40
    }

    focusTextInput() {
        this.state.textInput.current.focus();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.toggleLoading();
        if(this.state.noteId === null){
            this.props.saveNewNote(
                this.state.note, 
                this.props.isLogin, 
                this.props.userId
            );
        } else {
            //otherwise update an existing note.
            this.props.updateNote(
                this.state.note, 
                this.props.isLogin, 
                this.props.userId,
                this.state.noteId
            );
        }
        this.setState({
            action: 'save'
        })
        
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push('/list');
    }

    pendingItemHandleCheckBox = (idx) =>  {
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        noteCopy.items.completed.push({...noteCopy.items.pending[idx]});
        noteCopy.items.pending.splice(idx, 1);
        if(noteCopy.items.pending.length === 0){
            noteCopy.items.pending.push(
                {
                    id: 0,
                    checked: false,
                    description: ''
                }
            );
        }
        this.setState({note: noteCopy});
    }

    

    completedHandleOnClick = (idx) =>{
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        noteCopy.items.pending.push({...noteCopy.items.completed[idx]});
        noteCopy.items.completed.splice(idx, 1)
        this.setState({note: noteCopy});
    }

    pendingItemOnChange = (id, event, maxLength) => {
        event.preventDefault();
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        //On enter key press, create a new pending item;
        if(event.key === 'Enter'){
            noteCopy.items.pending.push({
                id: this.state.note.items.pending.length,
                checked: false,
                description: ''});
        } else {
            let newValueTrimmed = event.target.value.trim();

            if(newValueTrimmed.length < maxLength ){
                noteCopy.items.pending[id].description = event.target.value;
                this.setState({note: noteCopy});
            }
        }
    }

    handleAddNewListItem = (e) => {
        e.preventDefault();
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        noteCopy.items.pending.push({
            id: this.state.note.items.pending.length,
            checked: false,
            description: ''
        });
        this.setState({note: noteCopy});
    }

    pendingItemOnKeyPress = (id, event, maxLength) => {
        if(event.key === 'Enter'){
            this.handleAddNewListItem(event);
        } else {
            event.preventDefault();
            let noteCopy = JSON.parse(JSON.stringify(this.state.note));
            const value = event.target.value + event.key;
            const trimmedValue = value.trim()
            if(trimmedValue.length < maxLength ){
                noteCopy.items.pending[id].description = value;
            }
            this.setState({note: noteCopy});
        }
        
    }

    changeTitle = () => {
        this.setState({titleChange: !this.state.titleChange});
    }

    handleTitleKeyPress = (event) => {
        if(event.key === 'Enter'){
            this.setState({titleChange: false});
        }
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        noteCopy.title = event.target.value;
        this.setState({note: noteCopy});
    }

    handleDeleteNoteItem = (e, type, idx) => {
        e.preventDefault();
        let newNoteState = JSON.parse(JSON.stringify(this.state.note));
        newNoteState.items[type].splice(idx, 1);
        this.setState({note: newNoteState});
    }

    handleDelete = (event, noteId, isLogin, userId) => {
        event.preventDefault();
        this.props.toggleLoading();
        this.props.deleteNote(noteId, isLogin, userId);
        this.setState({
            action: 'delete'
        })
    }

    buildForm = (titleChange, isNew) => {
        let title = (
            <Input 
                className=''
                fontSize='30'
                type='text' 
                placeholder='Title'
                center
                underline
                value={this.state.note.title}
                onChange={(event) => this.handleTitleKeyPress(event)}
                onKeyPress={(event)=>this.handleTitleKeyPress(event)}
            />
        )

        let buttons = [
            <Button color='primary' variant='default' onClick={this.handleSubmit}>Save</Button>,
            <Button color='default' variant='default' onClick={this.handleCancel}>Cancel</Button>
        ]

        if(!isNew){
            buttons.push(<Button color='secondary' variant='default' onClick={this.handleDelete}>Delete</Button>);
        }
        
        return (
            <Form 
                customTitle={title}
                buttons={buttons}
            >
                <NoteContainer 
                    data={this.state.note.items}
                    completedHandleOnClick={(idx) => this.completedHandleOnClick(idx)}
                    pendingItemHandleCheckBox={(idx) => this.pendingItemHandleCheckBox(idx)}
                    pendingItemOnChange={(idx, event) => this.pendingItemOnChange(idx, event, this.state.inputMaxLength)}
                    pendingItemOnKeyPress={(idx, event) => this.pendingItemOnKeyPress(idx, event, this.state.inputMaxLength)}
                    onDelete={(e, type, idx) => this.handleDeleteNoteItem(e, type, idx)}
                    addNewItem={(e) => this.handleAddNewListItem(e)}
                />
            </Form>
        )
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.note.items.pending.length > prevState.note.items.pending.length){
            //this.focusTextInput();
        }

        if(!this.props.loading && prevProps.loading){
            this.props.toggleNoticeBar('success', this.state.note.title + ' ' + this.state.action);
        }
    }

    componentDidMount() {
        if(this.props.history &&
            this.props.history.location && 
            this.props.history.location.state && 
            this.props.history.location.state.noteId)
        {
            const noteId = this.props.history.location.state.noteId;
            api.getNote(this.props.userId, noteId)
            .then(res => {
                if(res.items.completed === undefined){
                    res.items.completed = [];
                }
                this.setState({
                    note: res,
                    noteId: noteId,
                    loading: false,
                    titleChange: false
                });
            })
            .catch(err => {
                alert('ERROR');
                console.log('err',err);
            })
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render(){
        let content = (<Form ><SpinnerIcon /></Form>);
        if(!this.state.loading){
            content = this.buildForm(this.state.titleChange, this.state.noteId === null);
        }
        return content;
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.user.login,
        loading: state.user.loading,
        userId: state.user.info.userId
      }
}

const mapDispatchToProps = dispatch => ({
    saveNewNote: (notes, isLogin, userId) => dispatch(actionCreators.saveNewNote(notes, isLogin, userId)),
    updateNote: (notes, isLogin, userId, noteId) => dispatch(actionCreators.updateNote(notes, isLogin, userId, noteId)),
    deleteNote: (noteId, isLogin, userId) => dispatch(actionCreators.deleteNote(noteId, isLogin, userId)),
    toggleLoading: () => dispatch(actionCreators.toggleLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
