import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../components/form/form';
import Input from '../../components/input/Input';
import Button from '../../components/Button/Button';
import NoteContainer from '../../components/Note/NoteContainer/NoteContainer';
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
        action: ''
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

    pendingItemOnChange = (id, event) => {
        event.preventDefault();
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        if(event.key === 'Enter'){
            noteCopy.items.pending.push({
                id: this.state.note.items.pending.length,
                checked: false,
                description: ''});
        } else {
            noteCopy.items.pending[id].description = event.target.value; 
        }
        
        this.setState({note: noteCopy});
    }

    pendingItemOnKeyPress = (id, event) => {
        event.preventDefault();
        let noteCopy = JSON.parse(JSON.stringify(this.state.note));
        if(event.key === 'Enter'){
            noteCopy.items.pending.push({
                id: this.state.note.items.pending.length,
                checked: false,
                description: ''});
        } else {
            const value = event.target.value + event.key;
            noteCopy.items.pending[id].description = value;
        }
        this.setState({note: noteCopy});
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

    handleDelete = (event, noteId, isLogin, userId) => {
        event.preventDefault();
        this.props.toggleLoading();
        this.props.deleteNote(noteId, isLogin, userId);
        this.setState({
            action: 'delete'
        })
    }

    buildForm = () => {
        let title = null;
        if(!this.state.titleChange){
            title = (
                <h1 onClick={()=>this.changeTitle()}>
                    {this.state.note.title}
                </h1>
            );
        } else {
            title = (
                <Input 
                    className='center-text title-input'
                    type='text' 
                    placeholder='Title'
                    value={this.state.note.title}
                    onChange={(event) => this.handleTitleKeyPress(event)}
                    onKeyPress={(event)=>this.handleTitleKeyPress(event)}
                />
            )
        }
        
        return (
            <Form title={title}
                buttons={[<button className='todo-actions todo-actions__submit' onClick={(event) => this.handleSubmit(event)}>
                <i className="fas fa-check todo-actions-icon" />
            </button>,
            <button className='todo-actions todo-actions__cancel' onClick={(event) => this.handleCancel(event)}>
                <i className="fas fa-times todo-actions-icon" />
            </button>,
            <button className='todo-actions todo-actions__cancel' onClick={(event) => this.handleDelete(event, this.state.noteId, this.props.isLogin, this.props.userId)}>
                <i  className="far fa-trash-alt"/>
            </button>,
            <Button primary={true} value='Save' onClick={this.handleSubmit}/>,
            <Button secondary={true} value='Cancel' onClick={this.handleCancel}/>,
            <Button secondary={true} value='Delete' onClick={this.handleDelete}/>
        
        ]}
            >
                <NoteContainer 
                    data={this.state.note.items}
                    completedHandleOnClick={(idx) => this.completedHandleOnClick(idx)}
                    pendingItemHandleCheckBox={(idx) => this.pendingItemHandleCheckBox(idx)}
                    pendingItemOnChange={(idx, event) => this.pendingItemOnChange(idx, event)}
                    pendingItemOnKeyPress={(idx, event) => this.pendingItemOnKeyPress(idx, event)}
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
                    loading: false
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
        let content = (<i class="fas fa-spinner fa-spin"/>);
        if(!this.state.loading){
            content = this.buildForm();
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
